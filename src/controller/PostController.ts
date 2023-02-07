import { Request, Response } from "express"
import { PostsDatabase } from "../database/PostsDatabase"

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const postDataBase = new PostsDatabase()
      const videosDB = await postDataBase.findPosts(q)

      res.status(200).send(videosDB)
  
    } catch (error) {
        console.log(error)
        if (req.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }
}