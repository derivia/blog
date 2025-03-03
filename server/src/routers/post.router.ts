import { Router } from "express";
import * as PostController from "../controllers/post.controller";
import { asyncHandler } from "../helpers/async";

const postRouter = Router();

postRouter.get("/", asyncHandler(PostController.getPosts))
postRouter.post("/", asyncHandler(PostController.createPost));
postRouter.get("/:slug", asyncHandler(PostController.getPostBySlug));
postRouter.delete("/:slug", asyncHandler(PostController.deletePostBySlug));

export default postRouter;
