import express from 'express'
import cors from 'cors'
import console from 'console'
import { UserController } from './controller/UserController'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

const userController = new UserController()


app.get("/users", userController.getUsers)

