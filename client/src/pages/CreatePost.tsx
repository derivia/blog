import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		try {
			const response = await fetch("http://localhost:3000/api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title, content }),
			});

			if (!response.ok) throw new Error("Failed to create post");

			navigate("/");
		} catch (err) {
			console.error("Error creating post:", err);
		}
	};

	return (
		<div className="h-screen text-3xl flex flex-col gap-3 justify-center items-center">
			<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
          className="p-3"
				/>
				<textarea
					placeholder="Content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
          className="p-3"
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
