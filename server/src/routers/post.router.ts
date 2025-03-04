import { Router } from "express";
import * as PostController from "../controllers/post.controller";
import { asyncHandler } from "../helpers/async";
import { verifyToken } from "../middlewares/auth";

const postRouter = Router();

postRouter.get("/", asyncHandler(PostController.getPosts));
postRouter.get("/:slug", asyncHandler(PostController.getPostBySlug));

// routes below are protected by jwt token
postRouter.use(verifyToken);
postRouter.post("/", asyncHandler(PostController.createPost));
postRouter.delete("/:slug", asyncHandler(PostController.deletePostBySlug));
postRouter.put("/:slug", asyncHandler(PostController.updatePostBySlug));

export default postRouter;
