import  express  from "express";
import { PostsBusiness } from "../business/PostsBusiness";
import { PostController } from "../controller/PostsController";
import { PostsDatabase } from "../database/PostsDatabase";
import { PostDTO } from "../dtos/PostDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postsRouter = express.Router()

const postsController = new PostController(
  new PostDTO(),
  new PostsBusiness(
    new PostsDatabase(),
    new TokenManager(),
    new IdGenerator()
  )
)

//  get posts
postsRouter.get("/", postsController.getPosts)
//  create post
postsRouter.post("/", postsController.createPost)
//  edit post
postsRouter.put("/:id", postsController.editPost)
//  delete post
postsRouter.delete("/:id", postsController.deletePost)
//  like / dislike post