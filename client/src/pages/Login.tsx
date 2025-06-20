import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			await axios.post(
				"http://localhost:3000/api/login",
				{ password },
				{ withCredentials: true },
			);
			navigate("/");
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				setError(err.response?.data?.message || "Login failed");
			} else {
				setError("Login failed");
			}
		}
	};

	return (
		<div className="h-screen text-3xl flex flex-col gap-3 justify-center items-center">
			<div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full p-2 border rounded"
					/>
					{error && <div className="text-red-600">{error}</div>}
					<button
						type="submit"
						className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-700"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
