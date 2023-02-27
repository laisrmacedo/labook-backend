import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostOutputDTO, DeletePostOutputDTO, EditPostOutputDTO, GetPostsOutputDTO, LikeOrDislikePostOutputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { LikesDislikesDB, PostDB, UserDB, USER_ROLES } from "../interfaces"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ){}

  public getPosts = async (input: GetPostsOutputDTO) => {
    const { token, q } = input

    //login check
    const payload = this.tokenManager.getPayload(token)
    if (payload === null) {
      throw new BadRequestError("ERROR: Login failed")
    }

    const postsDB: PostDB[] = await this.postsDatabase.getPosts(q)
    const posts = postsDB.map((postDB) => {
      const post = new Post(
        postDB.id,
        postDB.creator_id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at
      )
      const stylizedPost = {
        id: post.getId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
        creator: {
          id: post.getCreatorId(),
          name: ""
        }
      }
      return stylizedPost
    })

    for (const post of posts) {
      const userDB: UserDB = await this.postsDatabase.getPostCreator(post.creator.id)
      post.creator.name = userDB.name
    }

    return posts
  }

  public createPost = async (input: CreatePostOutputDTO): Promise<void> => {
    const {content, token} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed")
    }

    const newPost = new Post(
      this.idGenerator.generate(), 
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
      throw new BadRequestError("ERROR: No permission to finish.")
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

    await this.postsDatabase.updatePost(idToEdit, updatedPost.toDBModel())
  }

  public deletePost = async (input: DeletePostOutputDTO): Promise<void> => {
    const {idToDelete, token} = input

    //token ckeck
    const payload = this.tokenManager.getPayload(token)
    if(payload === null){
      throw new BadRequestError("ERROR: Login failed.")
    }

    const postDB: PostDB | undefined = await this.postsDatabase.getPostById(idToDelete)
    if(!postDB){
      throw new BadRequestError("ERROR: 'id' not found.")
    }

    if(payload.role !== USER_ROLES.ADMIN && postDB.creator_id !== payload.id){
      throw new BadRequestError("ERROR: No permission to finish.")
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
      if(like){
        await this.postsDatabase.removeLikeDislike(likesDislikes)
        post.removeLike()
      }else{
        await this.postsDatabase.updateLikeDislike(likesDislikes)
        post.removeLike()
        post.addDislike()
      }
    }else if(postLikeOrDislike === "Already disliked"){
      if(like){
        await this.postsDatabase.updateLikeDislike(likesDislikes)
        post.removeDislike()
        post.addLike()
      }else{
        await this.postsDatabase.removeLikeDislike(likesDislikes)
        post.removeDislike()
      }
    }else{
      await this.postsDatabase.likeOrDislikePost(likesDislikes)
      likeDB ? post.addLike() : post.addDislike()  
    }

    const updatedPostDB = post.toDBModel()
    await this.postsDatabase.updatePost(idToLike, updatedPostDB)
  }
}