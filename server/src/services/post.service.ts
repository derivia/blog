import { PostCreationDTO } from "../models/dtos/post.dto";
import postRepository from "../repositories/post.repository";

export const createPost = async (data: PostCreationDTO) => {
	const created = await postRepository.insert(data);
	return created;
};

export const deletePost = async (id: number) => {
	const deleted = await postRepository.delete({
		id,
	});
	return deleted;
};
