import { BadRequestError } from "../errors/BadRequestError"

export interface CreatePostOutputDTO {
  content: string
  token: string
}

export interface EditPostOutputDTO {
  idToEdit: string,
  content: string,
  token: string
}

export class PostDTO {
  public createPostInputDTO(
    content: unknown,
    token: string | undefined
  ): CreatePostOutputDTO{
    
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

    const dto: CreatePostOutputDTO = {
      content,
      token
    }

    return dto
  }

  public editPostInputDTO(
    idToEdit: string | undefined,
    content: unknown,
    token: string | undefined
  ): EditPostOutputDTO{
    console.log(idToEdit)
    if(idToEdit === ":id" || idToEdit === ""){
      throw new BadRequestError("ERROR: report the id of the post to be edited.")
    }
    if (typeof idToEdit !== "string") {
      throw new BadRequestError("ERROR: 'id' must be of type string.")
    }

    if(!content || content === ""){
      throw new BadRequestError("ERROR: the field is mandatory.")
    }
    if (typeof content !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

    if(!token || token === ""){
      throw new BadRequestError("ERROR: log in to edit the post.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'token' must be of type string.")
    }

    const dto: EditPostOutputDTO = {
      idToEdit,
      content,
      token
    }

    return dto
  }

}