import { Request, Response } from "express"
import { UsersDatabase } from "../database/UsersDatabase"

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const usersDataBase = new UsersDatabase()
      const videosDB = await usersDataBase.findUsers(q)

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