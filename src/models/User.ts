import { UserBusinessModel, UserDB, USER_ROLES } from "../interfaces"

export class User {
  constructor(
    private id: string, 
    private name: string,
    private email: string, 
    private password: string,
    private role: USER_ROLES,
    private createdAt: string
  ){}

  public getId():string{
    return this.id
  }
  public getName():string{
    return this.name
  }
  public getEmail():string{
    return this.email
  }
  public getPassword():string{
    return this.password
  }
  public getRole():USER_ROLES{
    return this.role
  }
  public getCreatedAt():string{
    return this.createdAt
  }

  public toDBModel(): UserDB {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt
    }
  }

  public toBusinessModel(): UserBusinessModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt
    }
  }

}