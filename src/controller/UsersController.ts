import { Request, Response } from "express"
import { UsersDatabase } from "../database/UsersDatabase"
import { User } from "../models/User"
import { Role, UsersDB } from "../interfaces"
import { UsersBusiness } from "../business/UsersBusiness"
import { BaseError } from "../errors/BaseError"

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const usersBusiness = new UsersBusiness()
      const output = await usersBusiness.getUsers(q)

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

  public createUser = async (req: Request, res: Response) => {
    try {
      const {name, email, password} = req.body

      const userBusiness = new UsersBusiness()
      const output = userBusiness.createUser(name, email, password)
    //não consigo mostrar?
      res.status(200).send({
        message: "User created.",
        user: output
      })
  
    } catch (error) {
        console.log(error)
        if (error instanceof BaseError) {
          res.status(error.statusCode).send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
  }

  // async (req: Request, res: Response) => {
  //   try {

  //     res.status(200).send(videosDB)
  
  //   } catch (error) {
  //       console.log(error)
  //      if (error instanceof BaseError) {
              // res.status(error.statusCode).send(error.message)
  //       } else {
  //           res.send("Erro inesperado")
  //       }
  //   }
}