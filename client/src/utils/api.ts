import axios from "axios";
import { PostCreationData } from "./post";
import { BASE_URL } from "./env";

export const createPost = async (data: PostCreationData) => {
	const { title, content, slug, tags } = data;
	const response = await axios.post(BASE_URL + "/posts", {
		title,
		content,
		slug,
		tags,
	});
	console.log(response.data);
};

export const fetchPostBySlug = async (slug: string) => {
	const response = await axios.get(BASE_URL + `/posts/${slug}`);
	console.log(response.data);
};

export const fetchPosts = async () => {
	const response = await axios.get(BASE_URL + "/posts");
	console.log(response.data);
};
