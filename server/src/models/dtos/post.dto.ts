import { IsNotEmpty, Matches } from "class-validator";
import { z } from "zod";

export const PostUpdateSchema = z
	.object({
		title: z.string().min(1, "Title cannot be empty").optional(),
		content: z.string().min(1, "Title cannot be empty").optional(),
		slug: z
			.string()
			.min(1, "Slug cannot be empty")
			.regex(
				/^[a-z0-9-]+$/,
				"Slug can only contain lowercase letters, numbers, and hyphens",
			)
			.optional(),
	})
	.refine(
		(data) =>
			data.title !== undefined ||
			data.content !== undefined ||
			data.slug !== undefined,
		{
			message: "At least one field (title, content, or slug) must be provided",
		},
	);

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

export class PostResponseDTO {
	id: string;
	title: string;
	content: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(post: any) {
		this.id = post.id;
		this.title = post.title;
		this.content = post.content;
		this.slug = post.slug;
		this.createdAt = post.createdAt;
		this.updatedAt = post.updatedAt;
	}
}

export type PostUpdateDTO = z.infer<typeof PostUpdateSchema>;
