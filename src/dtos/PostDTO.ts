import { BadRequestError } from "../errors/BadRequestError"

export interface CreatePostInputDTO {
  content: string
  token: string
}

export interface LoginInputDTO {
  email: string,
  password: string
}

export class PostDTO {
  public createPostInput(
    content: unknown,
    token: unknown
  ): CreatePostInputDTO{
    
    if (!content ||  content === "") {
      throw new BadRequestError("ERROR: the field is mandatory.")
    }
    if (typeof content !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

    //verificaçao desnecessária?
    if (!token ||  token === "") {
      throw new BadRequestError("ERROR: Log in to create a post.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

    const dto: CreatePostInputDTO = {
      content,
      token
    }

    return dto
  }

  // public loginInput(
  //   email: unknown,
  //   password: unknown
  // ): LoginInputDTO{

  //   if(!email || email === ""){
  //     throw new BadRequestError("ERROR: all fields are mandatory.")
  //   }
  //   if (typeof email !== "string") {
  //     throw new BadRequestError("ERROR: 'email' must be of type string.")
  //   }

  //   if(!password || password === ""){
  //     throw new BadRequestError("ERROR: all fields are mandatory.")
  //   }
  //   if (typeof password !== "string") {
  //     throw new BadRequestError("ERROR: 'password' must be of type string.")
  //   }

  //   const dto: LoginInputDTO = {
  //     email,
  //     password
  //   }

  //   return dto
  // }
  // public createUserOutput(user: User){
  //   const dto = {
      
  //   }
  // }
}