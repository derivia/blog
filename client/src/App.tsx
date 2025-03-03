import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<Routes>
			<Route path="/*" element={<NotFound />}></Route>
		</Routes>
	);
};

export default App;
