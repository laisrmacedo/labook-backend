import e from "express"
import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostOutputDTO, DeletePostOutputDTO, EditPostOutputDTO, LikeOrDislikePostOutputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { LikesDislikesDB, PostDB, USER_ROLES } from "../interfaces"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ){}
  //falta proteger com o pedido do token
  public getPosts = async (q: string | undefined): Promise<Post[]> => {
    const postsDB: PostDB[] = await this.postsDatabase.getPosts(q)

    const posts: Post[] = postsDB.map((postDB) => new Post(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    ))

    return posts
  }

  public createPost = async (input: CreatePostOutputDTO): Promise<void> => {
    const {content, token} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    const id = this.idGenerator.generate()

    const newPost = new Post(
      id, 
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString()
    )

    const newPostDB = newPost.toDBModel()

    await this.postsDatabase.insertPost(newPostDB)

  }

  public editPost = async (input: EditPostOutputDTO): Promise<void> => {
    const {idToEdit, content, token} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToEdit)
    if(!postDB){
      throw new BadRequestError("ERROR: 'id' not found")
    }

    if(postDB.creator_id !== payload.id){
      throw new BadRequestError("ERROR: Permission fail")
    }

    const updatedPost = new Post(
      postDB.id, 
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    )

    updatedPost.setContent(content)
    updatedPost.setUpdatedAt(new Date().toISOString())

    const updatedPostDB = updatedPost.toDBModel()

    await this.postsDatabase.updatePost(idToEdit, updatedPostDB)
  }

  public deletePost = async (input: DeletePostOutputDTO): Promise<void> => {
    const {idToDelete, token} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToDelete)
    if(!postDB){
      throw new BadRequestError("ERROR: 'id' not found")
    }

    if(payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== payload.id){
      throw new BadRequestError("ERROR: Permission fail")
    }

    await this.postsDatabase.deletePost(idToDelete)
  }

  public likeOrDislikePost = async (input: LikeOrDislikePostOutputDTO): Promise<void> => {
    const {idToLike, token, like} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToLike)
    if(!postDB){
      throw new BadRequestError("ERROR: 'id' not found")
    }

    // if(payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== payload.id){
    //   throw new BadRequestError("ERROR: Permission fail")
    // }

    const likeDB = like ? 1 : 0

    const likesDislikes : LikesDislikesDB = {
      user_id: payload.id,
      post_id: postDB.id,
      like: likeDB
    }

    const post = new Post(
      postDB.id, 
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    )

    const postLikeOrDislike = await this.postsDatabase
      .findLikeDislike(likesDislikes)

    //like or dislike check 
    if(postLikeOrDislike === "Already liked"){
      //req.body: like = true
      if(like){
        await this.postsDatabase.removeLikeDislike(likesDislikes)
        post.removeLike()
      //req.body: like = false
      }else{
        await this.postsDatabase.updateLikeDislike(likesDislikes)
        post.removeLike()
        post.addDislike()
      }
    }else if(postLikeOrDislike === "Already disliked"){
      //req.body: like = true
      if(like){
        await this.postsDatabase.updateLikeDislike(likesDislikes)
        post.removeDislike()
        post.addLike()
        //req.body: like = false
      }else{
        await this.postsDatabase.removeLikeDislike(likesDislikes)
        post.removeDislike()
      }
    }else{
      await this.postsDatabase.likeOrDislikePost(likesDislikes)
      //to update quantity of like or dislike
      likeDB ? post.addLike() : post.addDislike()  
    }

    const updatedPostDB = post.toDBModel()
    await this.postsDatabase.updatePost(idToLike, updatedPostDB)
  }
}