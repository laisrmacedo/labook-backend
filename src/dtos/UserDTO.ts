import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export interface CreateUserOutputDTO {
  name: string,
  email: string,
  password: string
}

export interface LoginOutputDTO {
  email: string,
  password: string
}

export class UserDTO {
  public createUserInputDTO(
    name: unknown,
    email: unknown,
    password: unknown
  ): CreateUserOutputDTO{

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

    const dto: CreateUserOutputDTO = {
      name,
      email,
      password
    }

    return dto
  }

  public loginInputDTO(
    email: unknown,
    password: unknown
  ): LoginOutputDTO{

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

    const dto: LoginOutputDTO = {
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