import {
	PostCreationDTO,
	PostResponseDTO,
	PostUpdateDTO,
} from "../models/dtos/post.dto";
import { Post } from "../models/post";
import postRepository from "../repositories/post.repository";
import _ from "lodash";

export const createPost = async (data: PostCreationDTO) => {
	const post = new Post();
	Object.assign(post, data);
	await postRepository.insert(post);
	const created = await postRepository.findOneBy({ slug: data.slug });
	return new PostResponseDTO(created);
};

export const getPosts = async () => {
	const posts = await postRepository.find();
	return posts.map((post) => new PostResponseDTO(post));
};

export const deletePost = async (id: string) => {
	const deleted = await postRepository.delete({
		id,
	});
	return deleted;
};

export const getPostById = async (id: string) => {
	const post = await postRepository.findOneBy({ id });
	return post;
};

export const getPostBySlug = async (slug: string) => {
	const post = await postRepository.findOneBy({ slug });
	return post ? new PostResponseDTO(post) : null;
};

export const updatePostBySlug = async (
	slug: string,
	updateData: PostUpdateDTO,
) => {
	const allowedFields = _.pick(updateData, ["title", "content", "slug"]);
	const post = await postRepository.update({ slug }, allowedFields);
	return post;
};
