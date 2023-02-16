import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostOutputDTO, EditPostOutputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { PostDB } from "../interfaces"
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

}