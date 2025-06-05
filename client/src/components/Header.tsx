import { Link } from "react-router-dom";

const Header = () => {
	return (
		<>
			<Link to="/" className="text-xl font-semibold text-gray-800">
				Lorran
			</Link>
			<nav>
				<ul className="flex items-center space-x-4">
					<li>
						<Link to="/" className="text-gray-600 hover:text-gray-800">
							Posts
						</Link>
					</li>

					<li>
						<Link to="/projects" className="text-gray-600 hover:text-gray-800">
							Projects
						</Link>
					</li>
					<li>
						<Link
							target="_blank"
							to="https://github.com/derivia"
							className="text-gray-600 hover:text-gray-800"
						>
							GitHub
						</Link>
					</li>
					<li>
						<Link to="/about" className="text-gray-600 hover:text-gray-800">
							About me
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Header;
