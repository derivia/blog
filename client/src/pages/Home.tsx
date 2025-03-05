// Posts goes here. A header with "About me" and "GitHub" should appear on the
// top bar of every page, make the posts only have a title and date, with
// optional tags maybe later.
//
// The post should be a rounded box that wraps the above, clickable as a link to
// the complete post page.
//
// The posts should be fetched from the server 'GET /api/posts'.
// The complete post should be fetched from the server with 'GET /api/posts/:slug'

import Header from "../components/Header";
import { createPost } from "../utils/api";

const Home = () => {
	createPost({ title: "", content: "" });
	return (
		<>
			<Header />
			<main className="mt-12">
				<h1 className="text-5xl mb-9">Posts</h1>
				{/* Posts list */}
			</main>
		</>
	);
};

export default Home;
