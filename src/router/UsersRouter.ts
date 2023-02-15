import  express  from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UserController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";
import { UserDTO } from "../dtos/UserDTO";
import { TokenManager } from "../services/TokenManager";

export const usersRouter = express.Router()

const userController = new UserController(
  new UserDTO(),
  new UsersBusiness(
    new UsersDatabase(),
    new TokenManager()
  )
)
// signup
//  login
usersRouter.get("/", userController.getUsers)
usersRouter.post("/", userController.createUser)
usersRouter.post("/login", userController.login)
usersRouter.delete("/:id", userController.deleteUser)