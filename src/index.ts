import express from 'express'
import cors from 'cors'
import console from 'console'
import dotenv from 'dotenv'

import { usersRouter } from './router/UsersRouter'
import { postsRouter } from './router/PostsRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`)
})

app.use("/users", usersRouter)

app.use("/posts", postsRouter)

