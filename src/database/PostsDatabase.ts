import { PostDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
  //attributes
  public static TABLE_POSTS = "posts" //global constant

  //methods
  public async getPosts(q: string | undefined): Promise<PostDB[]>{
    let postsDB
    if(q){
      const result = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .where("name", "LIKE", `%${q}%`)
      postsDB = result
    }else{
      const result = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      postsDB = result
    }
    return postsDB
  }

  public async getPostById(id: string): Promise<PostDB | undefined>{
    const result: PostDB[] = await BaseDatabase
      .connection(PostsDatabase.TABLE_POSTS)
      .select()
      .where({ id })

    return result[0]
  }

  public async insertPost(post: PostDB){
    await BaseDatabase
    .connection(PostsDatabase.TABLE_POSTS)
    .insert(post)
  }

  public async updatePost(idToEdit: string, updatedPost: PostDB){
    await BaseDatabase
    .connection(PostsDatabase.TABLE_POSTS)
    .update(updatedPost)
    .where({id: idToEdit})
  }
}