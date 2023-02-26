import { LikesDislikesDB, PostDB, UserDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{
  //attributes
  public static TABLE_POSTS = "posts" //global constant
  public static TABLE_LIKES_DISLIKES = "likes_dislikes" //global constant
  public static TABLE_USERS = "users" //global constant

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

  public async insertPost(post: PostDB): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_POSTS)
    .insert(post)
  }

  public async updatePost(id: string, updatedPost: PostDB): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_POSTS)
    .update(updatedPost)
    .where({ id })
  }
  
  public async deletePost(id: string): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_POSTS)
    .del()
    .where({ id })
  }
  
  public async likeOrDislikePost(item: LikesDislikesDB): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
    .insert(item)
  }
  
  public async findLikeDislike(item: LikesDislikesDB): Promise<string | null>{
    const [result]: LikesDislikesDB[] = await BaseDatabase
    .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
    .select()
    .where({
      user_id: item.user_id,
      post_id: item.post_id
    })

    if(result){
      return result.like === 1 ? "Already liked" : "Already disliked"
    }else{
      return null
    }
  }
  
  public async removeLikeDislike(LikeDislikeDB: LikesDislikesDB): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
    .del()
    .where({ 
      user_id: LikeDislikeDB.user_id,
      post_id: LikeDislikeDB.post_id
    })
  }
  
  public async updateLikeDislike(LikeDislikeDB: LikesDislikesDB): Promise<void>{
    await BaseDatabase
    .connection(PostsDatabase.TABLE_LIKES_DISLIKES)
    .update(LikeDislikeDB)
    .where({ 
      user_id: LikeDislikeDB.user_id,
      post_id: LikeDislikeDB.post_id
    })
  }

  public async getPostCreator(creatorId: string): Promise<UserDB>{
    const [users] = await BaseDatabase
    .connection(PostsDatabase.TABLE_USERS)
    .select()
    .where({ id: creatorId })

    return users
  }
}