import { BadRequestError } from "../errors/BadRequestError"

export interface GetPostsOutputDTO { 
  token: string,
  q: string | undefined
}

export interface CreatePostOutputDTO {
  content: string
  token: string
}

export interface EditPostOutputDTO {
  idToEdit: string,
  content: string,
  token: string
}

export interface DeletePostOutputDTO {
  idToDelete: string,
  token: string
}

export interface LikeOrDislikePostOutputDTO {
  idToLike: string,
  token: string,
  like: boolean,
}

export class PostDTO {
  public getPostsInputDTO(
    token: unknown,
    q: unknown
  ):GetPostsOutputDTO{
    
    if(!token){
      throw new BadRequestError("ERROR: log in to see the users.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'token' must be of type string.")
    }

    if (q !== undefined && typeof q !== "string") {
      throw new BadRequestError("ERROR: the query must be of type string.")
    }

    const dto: GetPostsOutputDTO = {
      token,
      q
    }

    return dto
  }

  public createPostInputDTO(
    content: unknown,
    token: string | undefined
  ): CreatePostOutputDTO{
    
    if (!content ||  content === "") {
      throw new BadRequestError("ERROR: the 'content' field is mandatory.")
    }
    if (typeof content !== "string") {
      throw new BadRequestError("ERROR: 'content' must be of type string.")
    }

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

    if(idToEdit === ":id" || idToEdit === ""){
      throw new BadRequestError("ERROR: report the id of the post to be edited.")
    }
    if (typeof idToEdit !== "string") {
      throw new BadRequestError("ERROR: 'id' must be of type string.")
    }

    if(!content || content === ""){
      throw new BadRequestError("ERROR: the 'content' field is mandatory.")
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

  public deletePostInputDTO(
    idToDelete: string,
    token: string | undefined
  ): DeletePostOutputDTO{

    if(idToDelete === ":id" || idToDelete === ""){
      throw new BadRequestError("ERROR: report the id of the post to be deleted.")
    }

    if(!token || token === ""){
      throw new BadRequestError("ERROR: log in to edit the post.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'token' must be of type string.")
    }

    const dto: DeletePostOutputDTO = {
      idToDelete,
      token
    }

    return dto
  }

  public likeOrDislikePostInputDTO(
    idToLike: string,
    token: string | undefined,
    like: unknown
  ): LikeOrDislikePostOutputDTO{

    if(idToLike === ":id" || idToLike === ""){
      throw new BadRequestError("ERROR: report the id of the post to be liked.")
    }

    if(!token || token === ""){
      throw new BadRequestError("ERROR: log in to edit the post.")
    }
    if (typeof token !== "string") {
      throw new BadRequestError("ERROR: 'token' must be of type string.")
    }

    if(like === undefined || like === ""){
      throw new BadRequestError("ERROR: the 'like' field is mandatory.")
    }
    if (typeof like !== "boolean") {
      throw new BadRequestError("ERROR: 'like' must be true or false.")
    }

    const dto: LikeOrDislikePostOutputDTO = {
      idToLike,
      token,
      like
    }

    return dto
  }

}