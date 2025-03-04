import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/about" element={<About />}></Route>
			<Route path="/*" element={<NotFound />}></Route>
		</Routes>
	);
};

export default App;
