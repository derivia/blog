import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { fetchPosts } from "../utils/api";
import { formatDateToBr } from "../utils/format-date";

interface Post {
	id: string;
	title: string;
	content: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postsData: Post[] = await fetchPosts();
				setPosts(postsData);
				setLoading(false);
			} catch (err: any) {
				console.error("Error fetching posts:", err);
				setError(
					err.message || "Failed to load posts. Please try again later.",
				);
				setLoading(false);
			}
		};

		getPosts();
	}, []);

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
			<header className="bg-white w-full max-w-4xl mx-auto p-4 flex justify-between items-center rounded-md shadow-md mb-8">
				<Header />
			</header>

			<main className="max-w-3xl w-full">
				<h1 className="text-3xl font-bold text-gray-800 mb-6 px-6">Posts</h1>
				{loading && <p className="text-gray-600 px-6">Loading posts...</p>}

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-6">
						{error}
					</div>
				)}

				{!loading && !error && posts.length === 0 && (
					<p className="text-gray-600 px-6">
						No posts found. Check back later!
					</p>
				)}

				<div className="space-y-6 px-6">
					{posts.map((post) => (
						<div key={post.id} className="bg-white rounded-md shadow-md p-6">
							<h2 className="text-xl font-semibold text-gray-800 mb-2">
								{post.title}
							</h2>
							<p className="text-gray-700 mb-3 line-clamp-3">{post.content}</p>
							<p className="text-gray-500 text-xs mb-2">
								Published: {formatDateToBr(post.createdAt, "pt-BR")}
							</p>
							<Link
								to={`/posts/${post.slug}`}
								className="text-indigo-500 hover:text-indigo-700 text-sm"
							>
								Read more →
							</Link>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
