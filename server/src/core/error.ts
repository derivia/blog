import { Response } from "express";
import {
	AuthErrorResponse,
	BadRequestResponse,
	ForbiddenResponse,
	InternalResponse,
	NotFoundResponse,
} from "./response";
import { environment } from "../config/env";

// define possible error types as an enum for better readability and reuse
export enum ErrorType {
	INTERNAL = "InternalError",
	NOT_FOUND = "NotFoundError",
	UNAUTHORIZED = "AuthFailureError",
	BAD_REQUEST = "BadRequestError",
	FORBIDDEN = "ForbiddenError",
}

// abstract class to create a base structure for all API errors
export abstract class ApiError extends Error {
	constructor(
		public error_type: ErrorType,
		public message: string = "Error",
	) {
		super(message);
	}

	// handles the error by sending the appropriate response based on the error type
	public static handle(error: ApiError, res: Response): Response {
		switch (error.error_type) {
			case ErrorType.INTERNAL:
				return new InternalResponse(error.message).send(res);
			case ErrorType.NOT_FOUND:
				return new NotFoundResponse(error.message).send(res);
			case ErrorType.UNAUTHORIZED:
				return new AuthErrorResponse(error.message).send(res);
			case ErrorType.BAD_REQUEST:
				return new BadRequestResponse(error.message).send(res);
			case ErrorType.FORBIDDEN:
				return new ForbiddenResponse(error.message).send(res);
			default:
				// in production, hide detailed error messages for security
				let message = error.message;
				if (environment === "production") message = "Something wrong happened";
				return new InternalResponse(message).send(res);
		}
	}
}

export class InternalError extends ApiError {
	constructor(message = "Internal error") {
		super(ErrorType.INTERNAL, message);
	}
}

export class AuthenticationError extends ApiError {
	constructor(message = "Authentication failed") {
		super(ErrorType.UNAUTHORIZED, message);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad request") {
		super(ErrorType.BAD_REQUEST, message);
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Not found") {
		super(ErrorType.NOT_FOUND, message);
	}
}

export class ForbiddenError extends ApiError {
	constructor(message = "Forbidden") {
		super(ErrorType.FORBIDDEN, message);
	}
}
