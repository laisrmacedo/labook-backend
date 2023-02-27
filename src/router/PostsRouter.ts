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

postsRouter.get("/", postsController.getPosts)
postsRouter.post("/", postsController.createPost)
postsRouter.put("/:id", postsController.editPost)
postsRouter.delete("/:id", postsController.deletePost)
postsRouter.put("/:id/like", postsController.likeOrDislikePost)