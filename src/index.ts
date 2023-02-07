import express from 'express'
import cors from 'cors'
import console from 'console'
import { usersRouter } from './router/UsersRouter'
import { postsRouter } from './router/PostsRouter'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.use("/users", usersRouter)

app.use("/posts", postsRouter)

