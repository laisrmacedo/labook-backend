import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export interface CreateUserInputDTO {
  name: string,
  email: string,
  password: string
}

export interface LoginInputDTO {
  email: string,
  password: string
}

export class UserDTO {
  public createUserInput(
    name: unknown,
    email: unknown,
    password: unknown
  ): CreateUserInputDTO{

    if (!name ||  name === "") {
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof name !== "string") {
      throw new BadRequestError("ERROR: 'name' must be of type string.")
    }

    if(!email || email === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof email !== "string") {
      throw new BadRequestError("ERROR: 'email' must be of type string.")
    }

    if(!password || password === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof password !== "string") {
      throw new BadRequestError("ERROR: 'password' must be of type string.")
    }

    const dto: CreateUserInputDTO = {
      name,
      email,
      password
    }

    return dto
  }

  public loginInput(
    email: unknown,
    password: unknown
  ): LoginInputDTO{

    if(!email || email === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof email !== "string") {
      throw new BadRequestError("ERROR: 'email' must be of type string.")
    }

    if(!password || password === ""){
      throw new BadRequestError("ERROR: all fields are mandatory.")
    }
    if (typeof password !== "string") {
      throw new BadRequestError("ERROR: 'password' must be of type string.")
    }

    const dto: LoginInputDTO = {
      email,
      password
    }

    return dto
  }
  // public createUserOutput(user: User){
  //   const dto = {
      
  //   }
  // }
}