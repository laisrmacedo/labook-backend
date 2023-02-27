import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
  constructor(
    private postDTO: PostDTO,
    private postsBusiness: PostsBusiness
  ){}
  public getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.getPostsInputDTO(
        req.headers.authorization,
        req.query.q
      )

      const output = await this.postsBusiness.getPosts(input)
      res.status(200).send(output)
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.send("Erro inesperado")
        }
    }
  }

  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.postDTO.createPostInputDTO(
        req.body.content,
        req.headers.authorization
      )

      await this.postsBusiness.createPost(input)
      res.status(201).end()
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.send("Erro inesperado")
        }
    }
  }

  public editPost = async (req: Request, res: Response): Promise<void>  => {
    try {
      const input = this.postDTO.editPostInputDTO(
        req.params.id,
        req.body.content,
        req.headers.authorization
      )

      await this.postsBusiness.editPost(input)
      res.status(200).end()
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.send("Erro inesperado")
        }
    }
  }

  public deletePost = async (req: Request, res: Response): Promise<void>  => {
    try {
      const input = this.postDTO.deletePostInputDTO(
        req.params.id,
        req.headers.authorization
      )

      await this.postsBusiness.deletePost(input)
      res.status(200).end()
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.send("Erro inesperado")
        }
    }
  }

  public likeOrDislikePost = async (req: Request, res: Response): Promise<void>  => {
    try {
      const input = this.postDTO.likeOrDislikePostInputDTO(
        req.params.id,
        req.headers.authorization,
        req.body.like
      )

      await this.postsBusiness.likeOrDislikePost(input)
      res.status(200).end()
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
          res.send("Erro inesperado")
        }
    }
  }

  
}