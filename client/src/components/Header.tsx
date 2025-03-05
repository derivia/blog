import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="flex text-xl flex-wrap mt-2 justify-between">
			<main>
				<Link to="/">Aiyqa</Link>
			</main>
			<nav className="flex gap-3">
				<Link target="_blank" to="https://github.com/derivia">GitHub</Link>
				<Link to="/about">About me</Link>
			</nav>
		</header>
	);
};

export default Header;
