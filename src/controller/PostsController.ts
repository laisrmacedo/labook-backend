import { Request, Response } from "express"
import { PostsBusiness } from "../business/PostsBusiness"
import { PostsDatabase } from "../database/PostsDatabase"
import { BaseError } from "../errors/BaseError"

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const postsBusiness = new PostsBusiness()
      const output = await postsBusiness.getPosts(q)
console.log(output)
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