import { Request, Response, NextFunction } from "express";
import { AuthErrorResponse, ForbiddenResponse } from "../core/response";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/env";

declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies["atk"];
	if (!token) return new AuthErrorResponse("Unauthorized").send(res);
	jwt.verify(
		token,
		jwt_secret,
		(err: jwt.JsonWebTokenError | null, user: any) => {
			if (err) return new ForbiddenResponse("Forbidden").send(res);
			req.user = user;
			next();
		},
	);
};
