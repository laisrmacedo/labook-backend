import express from 'express'
import cors from 'cors'
import console from 'console'
import { UserController } from './controller/UserController'
import { PostController } from './controller/PostController'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

const userController = new UserController()
// signup
//  login
app.get("/users", userController.getUsers)
app.post("/users", userController.createUser)


const postController = new PostController()
//  get posts
//  create post
//  edit post
//  delete post
//  like / dislike post

app.get("/posts", postController.getPosts)

