import  express  from "express";
import { PostController } from "../controller/PostsController";

export const postsRouter = express.Router()

const postsController = new PostController()

postsRouter.get("/", postsController.getPosts)

//  get posts
//  create post
//  edit post
//  delete post
//  like / dislike post