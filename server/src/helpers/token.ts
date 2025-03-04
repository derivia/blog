import { jwt_secret } from "../config/env";
import jwt from "jsonwebtoken";

export const generateToken = (): string => {
	const payload = {
		sub: "admin",
		iat: Math.floor(Date.now() / 1000),
		exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration time
		iss: "aiyqa",
		aud: "aiyqa",
	};
	return jwt.sign(payload, jwt_secret);
};
