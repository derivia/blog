import { Request, Response, Router } from "express";
import { asyncHandler } from "../helpers/async";
import { adm_pass } from "../config/env";
import bcrypt from "bcrypt";
import {
	AuthErrorResponse,
	BadRequestResponse,
	SuccessResponse,
} from "../core/response";
import { generateToken } from "../helpers/token";

const loginRouter = Router();
const login = async (req: Request, res: Response): Promise<Response> => {
	const { password } = req.body;
	if (!password) {
		return new BadRequestResponse("Missing password").send(res);
	}
	const isPasswordValid = await bcrypt.compare(password, adm_pass);
	if (!isPasswordValid) {
		return new AuthErrorResponse("Invalid password").send(res);
	}

	// generate token and add it to the 'atk' cookie
	const token = generateToken();
	res.cookie("atk", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
		maxAge: 1000 * 60 * 60, // cookie expiration (1 hour)
	});
	return new SuccessResponse("Login successful").send(res);
};

loginRouter.post("/", asyncHandler(login));

export default loginRouter;
