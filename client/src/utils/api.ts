import axios from "axios";
import { PostCreationData } from "./post";
import { API_BASE_URL } from "./env";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export const createPost = async (data: PostCreationData) => {
	try {
		const response = await apiClient.post("/posts", {
			title: data.title,
			content: data.content,
			slug: data.slug,
			tags: data.tags,
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "Failed to create post");
		}
		throw error;
	}
};

export const fetchPostBySlug = async (slug: string) => {
	try {
		const response = await apiClient.get(`/posts/${slug}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "Failed to fetch post");
		}
		throw error;
	}
};

export const fetchPosts = async () => {
	try {
		const response = await apiClient.get("/posts");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "Failed to fetch posts");
		}
		throw error;
	}
};

export const updatePost = async (
	slug: string,
	data: Partial<PostCreationData>,
) => {
	try {
		const response = await apiClient.patch(`/posts/${slug}`, data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "Failed to update post");
		}
		throw error;
	}
};

export const deletePost = async (slug: string) => {
	try {
		const response = await apiClient.delete(`/posts/${slug}`);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(error.response?.data?.message || "Failed to delete post");
		}
		throw error;
	}
};
