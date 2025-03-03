import { PostCreationDTO } from "../models/dtos/post.dto";
import postRepository from "../repositories/post.repository";

export const createPost = async (data: PostCreationDTO) => {
	const created = await postRepository.insert(data);
	return created;
};

export const getPosts = async () => {
	const posts = await postRepository.find();
	return posts;
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
	return post;
};
