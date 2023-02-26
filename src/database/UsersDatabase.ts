import { UserDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{
  //attributes
  public static TABLE_USERS = "users" //global constant

  //methods
  public async getUsers(q: string | undefined): Promise<UserDB[]>{
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

  public async getUserById(id: string): Promise<UserDB>{
      const [result]: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ id })

      return result
  }
  
  public async getUserByEmail(email: string): Promise<UserDB | undefined>{
      const result: UserDB[] = await BaseDatabase
      .connection(UsersDatabase.TABLE_USERS)
      .where({ email })

      return result[0]
  }

  public async createUser(user: UserDB): Promise<void>{
    await BaseDatabase
    .connection(UsersDatabase.TABLE_USERS)
    .insert(user)
  }

  public async deleteUser(idToDelete: string): Promise<void>{
    await BaseDatabase
    .connection(UsersDatabase.TABLE_USERS)
    .del()
    .where({id: idToDelete})
  }
}

