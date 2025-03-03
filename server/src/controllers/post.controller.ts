import { Request, Response } from "express";
import { PostCreationDTO } from "../models/dtos/post.dto";
import { SuccessResponse } from "../core/response";
import * as postService from "../services/post.service";
import { BadRequestError, NotFoundError } from "../core/error";

export const validateId = async (id: string): Promise<number | null> => {
	const parsedId = parseInt(id, 10);
	if (isNaN(parsedId) || parsedId <= 0) {
		return null;
	}
	return parsedId;
};

export const getPosts = async (
	_req: Request,
	res: Response,
): Promise<Response> => {
	const posts = await postService.getPosts();
	return new SuccessResponse(undefined, posts).send(res);
};

export const getPostBySlug = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { slug } = req.params;
	const post = await postService.getPostBySlug(slug);
	if (!post) {
		throw new NotFoundError("Post not found");
	}
	return new SuccessResponse(undefined, post).send(res);
};

export const createPost = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const data: PostCreationDTO = req.body;
	const existingPost = await postService.getPostBySlug(data.slug);
	if (existingPost) {
		throw new BadRequestError("Slug already in use");
	}
	const created = await postService.createPost(data);
	return new SuccessResponse("Post created", created).send(res);
};

export const deletePostBySlug = async (
	req: Request,
	res: Response,
): Promise<Response> => {
	const { slug } = req.params;

	const post = await postService.getPostBySlug(slug);
	if (!post) {
		throw new NotFoundError("Post not found");
	}

	const deleted = await postService.deletePost(post.id);
	return new SuccessResponse("Post deleted", deleted).send(res);
};
