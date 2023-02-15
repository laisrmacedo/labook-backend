import { PostsDatabase } from "../database/PostsDatabase"
import { CreatePostInputDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { PostsDB } from "../interfaces"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class PostsBusiness {
  constructor(
    private postsDatabase: PostsDatabase,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator
  ){}
  public getPosts = async (q: string | undefined) => {
    const postsDB: PostsDB[] = await this.postsDatabase.getPosts(q)

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

  public createPost = async (input: CreatePostInputDTO) => {
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
      new Date().toDateString(),
      new Date().toDateString()
    )

    const newPostDB = newPost.toDBModel()

    await this.postsDatabase.insertPost(newPostDB)

    const output = {
      message: "Post sucess."
    }

    return output
  }
}