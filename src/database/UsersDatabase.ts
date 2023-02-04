import { UsersDB } from "../interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class UsersDatabase extends BaseDatabase{
  //attributes
  public static TABLE_USERS = "users" //global constant

  //methods
  public async findUsers(q: string | undefined): Promise<UsersDB[]>{
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
}

