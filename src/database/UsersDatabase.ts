import { UsersDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{
  //attributes
  public static TABLE_USERS = "users" //global constant
  public static TABLE_POSTS = "posts" //global constant
  public static TABLE_LIKES_DISLIKES = "likes_dislikes" //global constant

  //methods
  public async getUsers(q: string | undefined): Promise<UsersDB[]>{
    let usersDB
    if(q){
      const result = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where("name", "LIKE", `%${q}%`)
      usersDB = result
    }else{
      const result = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      usersDB = result
    }
    return usersDB
  }

  public async getUserById(id: string): Promise<UsersDB[]>{
      const result: UsersDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ id })

      return result
  }
  
  public async getUserByEmail(email: string): Promise<UsersDB[]>{
      const result: UsersDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ email })

      return result
  }

  public async createUser(user: UsersDB): Promise<void>{
    await BaseDatabase
    .connection(UsersDatabase.TABLE_USERS)
    .insert(user)
  }

  public async deleteUser(idToDelete: string): Promise<void>{
    // await BaseDatabase
    // .connection(UsersDatabase.TABLE_LIKES_DISLIKES)
    // .del()
    // .where({user_id: idToDelete})
    // await BaseDatabase
    // .connection(UsersDatabase.TABLE_POSTS)
    // .del()
    // .where({creator_id: idToDelete})
    await BaseDatabase
    .connection(UsersDatabase.TABLE_USERS)
    .del()
    .where({id: idToDelete})
  }
}

