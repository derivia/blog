// Posts goes here. A header with "About me" and "GitHub" should appear on the
// top bar of every page, make the posts only have a title and date, with
// optional tags maybe later.
//
// The post should be a rounded box that wraps the above, clickable as a link to
// the complete post page.
//
// The posts should be fetched from the server 'GET /api/posts'.
// The complete post should be fetched from the server with 'GET /api/posts/:slug'

import { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchPosts } from "../utils/api";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getPosts = async () => {
			try {
				const postsData = await fetchPosts();
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
		<>
			<Header />
			<main className="mt-12">
				<h1 className="text-5xl mb-9">Posts</h1>
				{loading && <p className="text-gray-600">Loading posts...</p>}

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						{error}
					</div>
				)}

				{!loading && !error && posts.length === 0 && (
					<p className="text-gray-600">No posts found. Check back later!</p>
				)}
			</main>
		</>
	);
};

export default Home;
