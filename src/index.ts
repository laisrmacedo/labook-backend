import express from 'express'
import cors from 'cors'
import console from 'console'
import { PostController } from './controller/PostsController'
import { usersRouter } from './router/UsersRouter'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.use("/users", usersRouter)







const postController = new PostController()
//  get posts
//  create post
//  edit post
//  delete post
//  like / dislike post

app.get("/posts", postController.getPosts)

