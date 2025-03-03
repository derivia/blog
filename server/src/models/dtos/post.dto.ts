import { Post } from "../post";

export class PostCreationDTO {
	@IsNotEmpty()
	title: string;

	@IsNotEmpty()
	content: string;

	@IsNotEmpty()
	@Matches(/^[a-z0-9-]+$/, {
		message: "Slug can only contain lowercase letters, numbers, and hyphens",
	})
	slug: string;
}
export type PostUpdateDTO = {
	title?: string;
	content?: string;
	slug?: string;
};
