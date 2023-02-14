import  express  from "express";
import { UsersBusiness } from "../business/UsersBusiness";
import { UserController } from "../controller/UsersController";
import { UsersDatabase } from "../database/UsersDatabase";

export const usersRouter = express.Router()

const userController = new UserController(
  new UsersBusiness(
    new UsersDatabase()
  )
)
// signup
//  login
usersRouter.get("/", userController.getUsers)
usersRouter.post("/", userController.createUser)