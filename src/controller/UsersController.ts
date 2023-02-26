import { Request, Response } from "express"
import { UsersBusiness } from "../business/UsersBusiness"
import { BaseError } from "../errors/BaseError"
import { UserDTO } from "../dtos/UserDTO"

export class UserController {
  constructor(
    private userDTO: UserDTO,
    private usersBusiness: UsersBusiness
  ) { }

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.getUsersInputDTO(
        req.headers.authorization,
        req.query.q
      )

      const output = await this.usersBusiness.getUsers(input)
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

  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.createUserInputDTO(
        req.body.name,
        req.body.email,
        req.body.password,
      )

      const output = await this.usersBusiness.signup(input)
      res.status(201).send(output)

    } catch (error) {
      console.log(error)
      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.send("Erro inesperado")
      }
    }
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.loginInputDTO(
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

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = this.userDTO.deleteUserInput(
        req.params.id,
        req.headers.authorization,
      )

      await this.usersBusiness.deleteUser(input)
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