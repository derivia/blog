import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/about" element={<About />}></Route>
			<Route path="/create" element={<CreatePost />} />
			<Route path="/login" element={<Login />} />
			<Route path="/*" element={<NotFound />}></Route>
		</Routes>
	);
};

export default App;
