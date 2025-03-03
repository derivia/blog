import { Post } from "../Post";

export type PostCreationDTO = Pick<Post, "title" | "content" | "slug">;
export type PostUpdateDTO = {
	title?: string;
	content?: string;
	slug?: string;
};
