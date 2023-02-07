import { PostsDatabase } from "../database/PostsDatabase"
import { PostsDB } from "../interfaces"
import { Post } from "../models/Post"

export class PostsBusiness {
  public getPosts = async (q: string | undefined) => {
    const postsDataBase = new PostsDatabase()
    const postsDB: PostsDB[] = await postsDataBase.getPosts(q)

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
}