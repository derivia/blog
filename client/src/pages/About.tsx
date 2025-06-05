import { Link } from "react-router-dom";
import Header from "../components/Header";

const About = () => {
	return (
		<div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
			<header className="bg-white w-full max-w-4xl mx-auto p-4 flex justify-between items-center rounded-md shadow-md mb-8">
				<Header />
			</header>

			<main className="bg-white rounded-md shadow-md p-6 max-w-3xl w-full text-gray-700">
				<h2 className="text-2xl font-semibold mb-6">Hey, I'm Lorran!</h2>
				<div>
					<p className="mb-3">
						I've been dealing with software since I was a kid, starting with
						simple C++ terminal-based games.
					</p>
					<p className="mb-3">
						I like hardware, playing video games, gym-stuff and reading.
					</p>
					<p className="mb-3">
						On this website, you'll find my posts and articles I've written till
						now.
					</p>
					<p className="mb-3">
						Check out the{" "}
						<Link
							className="text-indigo-500 hover:text-indigo-700"
							to="/projects"
						>
							projects
						</Link>{" "}
						page to see a highlight of my open-source work.
					</p>
					<p className="mb-3">
						Send me an{" "}
						<Link
							className="text-indigo-500 hover:text-indigo-700"
							to="mailto:contato.lorransoares@gmail.com"
						>
							email
						</Link>{" "}
						if you want.
					</p>
				</div>
				<div className="mt-6 border-t pt-6 border-gray-200">
					<p className="mb-2">
						I started gym in the middle of 2024, since then I've been more
						focused on strength training. From someone that couldn't make more
						than 15 pushups, I feel great now.
					</p>
					<ul className="list-disc pl-5">
						<li>Here's my current lifting: </li>
						<li>Squat - 90kg</li>
						<li>Deadlift - 120kg</li>
						<li>Bench Press - 60kg</li>
						<li>Overhead Press - 28kg</li>
					</ul>
				</div>
			</main>
		</div>
	);
};

export default About;
