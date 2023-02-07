import { Request, Response } from "express"
import { UsersDatabase } from "../database/UsersDatabase"
import { User } from "../models/User"
import { Role, UsersDB } from "../interfaces"

export class UserController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined
  
      const usersDataBase = new UsersDatabase()
      const usersDB = await usersDataBase.findUsers(q)

      res.status(200).send(usersDB)
  
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

  public createUser = async (req: Request, res: Response) => {
    try {
      const {name, email, password} = req.body

      //syntax checking
      if (!name ||  name === "") {
        res.status(404)
        throw new Error("ERROR: all fields are mandatory.")
      }
      if (typeof name !== "string") {
        res.status(404)
        throw new Error("ERROR: 'name' must be of type string.")
      }
      if(name.length < 2) {
        res.status(404)
        throw new Error("ERROR: 'name' must be at least 2 characters.")
      }
      

      if(!email || email === ""){
        res.status(404)
        throw new Error("ERROR: all fields are mandatory.")
      }
      if (typeof email !== "string") {
        res.status(404)
        throw new Error("ERROR: 'email' must be of type string.")
      }
      if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
        res.status(404)
        throw new Error("ERROR: 'email' must be like 'example@example.example'.")
      }
  

      if(!password || password === ""){
        res.status(404)
        throw new Error("ERROR: all fields are mandatory.")
      }
      if (typeof password !== "string") {
        res.status(404)
        throw new Error("ERROR: 'password' must be of type string.")
      }
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
        res.status(404)
        throw new Error("ERROR: 'password' must be between 8 and 12 characters, with uppercase and lowercase letters and at least one number and one special character")
      }
      
      //replay ckeck
      const userDatabase = new UsersDatabase()
      const [foundEmail] = await userDatabase.findUserByEmail(email)

      if(foundEmail){
        res.status(404)
        throw new Error("ERROR: 'email' already exists.")
      }

      //signup
      const userInstance = new User(
        new Date().toDateString(), 
        name, 
        email, 
        password, 
        Role.NORMAL, 
        new Date().toISOString()
      )

      const userDB: UsersDB = {
        id: userInstance.getId(),
        name: userInstance.getName(),
        email: userInstance.getEmail(),
        password: userInstance.getPassword(),
        role: userInstance.getRole(),
        created_at: userInstance.getCreatedAt()
      }

      await userDatabase.createUser(userDB)

      res.status(200).send({message: "User created."})
  
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

  // async (req: Request, res: Response) => {
  //   try {

  //     res.status(200).send(videosDB)
  
  //   } catch (error) {
  //       console.log(error)
  //       if (req.statusCode === 200) {
  //           res.status(500)
  //       }
  //       if (error instanceof Error) {
  //           res.send(error.message)
  //       } else {
  //           res.send("Erro inesperado")
  //       }
  //   }
}