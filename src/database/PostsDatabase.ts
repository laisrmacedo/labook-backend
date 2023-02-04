import { Posts } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
  //attributes
  public static TABLE_POSTS = "posts" //global constant

  //methods
  public async findPosts(q: string | undefined): Promise<Posts[]>{
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
}