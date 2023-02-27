import  express  from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UserController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { UserDTO } from "../dtos/UserDTO";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router()

const userController = new UserController(
  new UserDTO(),
  new UsersBusiness(
    new UsersDatabase(),
    new TokenManager(), 
    new IdGenerator(),
    new HashManager()
  )
)

usersRouter.get("/", userController.getUsers)
usersRouter.post("/signup", userController.signup)
usersRouter.post("/login", userController.login)
usersRouter.delete("/:id", userController.deleteUser)