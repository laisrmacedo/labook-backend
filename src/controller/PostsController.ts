import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsDatabase } from "../database/PostsDatabase"
import { PostDTO } from "../dtos/PostDTO"
import { BaseError } from "../errors/BaseError"

export class PostController {
  constructor(
    private postDTO: PostDTO,
    private postsBusiness: PostsBusiness
  ){}
  public getPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const output = await this.postsBusiness.getPosts(q)

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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = this.postDTO.createPostInput(
        req.body.content,
        req.headers.authorization
      )
      // const content: string = req.body
      // const token: string = req.headers.authorization

      const output = await this.postsBusiness.createPost(input)

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

  
}