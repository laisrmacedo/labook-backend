import { Request, Response } from "express"
import { UsersBusiness } from "../business/UsersBusiness"
import { BaseError } from "../errors/BaseError"
import { UserDTO } from "../dtos/UserDTO"

export class UserController {
  constructor(
    private userDTO: UserDTO,
    private usersBusiness: UsersBusiness
  ){}
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      // const usersBusiness = new UsersBusiness()
      const output = await this.usersBusiness.getUsers(q)

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
      // const userDTO = new UserDTO()

      const input = this.userDTO.createUserInput(
        req.body.name,
        req.body.email,
        req.body.password,
      )

      // const userBusiness = new UsersBusiness()
      const output = await this.usersBusiness.createUser(input)
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

  public login = async (req: Request, res: Response) => {
    try {
      const input = this.userDTO.loginInput(
        req.body.email,
        req.body.password,
      )

      const output = await this.usersBusiness.login(input)

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

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const idToDelete = req.params.id

      const output = await this.usersBusiness.deleteUser(idToDelete)
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