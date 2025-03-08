import { Link } from "react-router-dom";
import Header from "../components/Header";

const About = () => {
	return (
		<>
			<Header />
			<main className="w-4/5 flex flex-col mt-12">
				<h1 className="text-5xl mb-3">About me</h1>
				<h2 className="text-3xl mb-6">Hey, I'm Lorran!</h2>
				<div>
					<p>
						I've been dealing with software since i was a kid, starting with
						simple C++ terminal-based games.
					</p>
					<p>I like hardware, playing video games, gym-stuff and reading.</p>
					<p>
						On this website, you'll find my posts and articles i've written til
						now.
					</p>
					<p>
						Check out the{" "}
						<Link className="text-leafgreen" to="/projects">
							projects
						</Link>{" "}
						page to see a highlight of my open-source work.
					</p>
					<p>
						Send me an{" "}
						<Link
							className="text-leafgreen"
							to="mailto:contato.lorransoares@gmail.com"
						>
							email
						</Link>{" "}
						if you want.
					</p>
				</div>
				<div className="mt-6">
					<p>
						I started gym in the middle of 2024, since them i've been more
						focused on strength training. From someone that couldn't make more
						than 15 pushups, I feel great now.
					</p>
					<ul>
						<li>Here's my current lifting: </li>
						<li>Squat - 65</li>
						<li>Deadlift - 120</li>
						<li>Bench Press - 60</li>
						<li>Overhead Press - 28</li>
					</ul>
				</div>
			</main>
		</>
	);
};

export default About;
