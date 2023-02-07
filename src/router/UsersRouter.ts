import  express  from "express";
import { UserController } from "../controller/UsersController";

export const usersRouter = express.Router()

const userController = new UserController()
// signup
//  login
usersRouter.get("/", userController.getUsers)
usersRouter.post("/", userController.createUser)