import { Response } from "express";

// define possible response status codes as an enum for better readability and reuse
enum ResponseStatus {
	SUCCESS = 200,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL = 500,
}

// abstract class to create a base structure for all API responses
abstract class ApiResponse {
	constructor(
		public status: ResponseStatus,
		public message?: string,
	) {}

	// prepares the response by setting headers and formatting the response body
	public prepare<T extends ApiResponse>(
		res: Response,
		response: T,
		headers: { [key: string]: string },
	): Response {
		// add any headers provided to the response
		for (const [key, value] of Object.entries(headers)) res.append(key, value);
		// set the status code and send the sanitized JSON response
		return res.status(this.status).json(ApiResponse.sanitize(response));
	}

	// sends the response by calling the prepare method
	public send(
		res: Response,
		headers: { [key: string]: string } = {},
	): Response {
		return this.prepare<ApiResponse>(res, this, headers);
	}

	// removes undefined fields from the response to keep it clean
	private static sanitize<T extends ApiResponse>(response: T): T {
		const clone: T = {} as T;
		Object.assign(clone, response);
		// @ts-ignore
		delete clone.status;

		// recursive sanitizing of nested objects
		for (const key in clone) {
			if (typeof clone[key] === "object" && clone[key] !== null) {
				if (Array.isArray(clone[key])) {
					// @ts-ignore
					// sanitize each item if array
					clone[key] = clone[key].map((item: any) =>
						ApiResponse.sanitize(item),
					);
				} else {
					// @ts-ignore
					// sanitize each object
					clone[key] = ApiResponse.sanitize(clone[key]);
				}
			} else if (typeof clone[key] === "undefined") {
				// remove undefined fields
				delete clone[key];
			}
		}
		return clone;
	}
}

// class for successful responses, includes data in the response
export class SuccessResponse<T> extends ApiResponse {
	constructor(
		message?: string,
		private data?: T,
	) {
		super(ResponseStatus.SUCCESS, message);
	}

	send(res: Response, headers: { [key: string]: string } = {}): Response {
		const transformedData = this.transformDates(this.data);
		return super.prepare<SuccessResponse<T>>(
			res,
			{ ...this, data: transformedData },
			headers,
		);
	}

	private transformDates(data: any): any {
		if (data instanceof Date) {
			return data.toISOString();
		}
		if (Array.isArray(data)) {
			return data.map((item) => this.transformDates(item));
		}
		if (typeof data === "object" && data !== null) {
			return Object.fromEntries(
				Object.entries(data).map(([key, value]) => [
					key,
					this.transformDates(value),
				]),
			);
		}
		return data;
	}
}

export class InternalResponse extends ApiResponse {
	constructor(message: string) {
		super(ResponseStatus.INTERNAL, message);
	}
}

export class BadRequestResponse extends ApiResponse {
	constructor(message = "Wrong parameters") {
		super(ResponseStatus.BAD_REQUEST, message);
	}
}

export class AuthErrorResponse extends ApiResponse {
	constructor(message = "Unauthorized") {
		super(ResponseStatus.UNAUTHORIZED, message);
	}
}

export class NotFoundResponse extends ApiResponse {
	constructor(message = "Not found") {
		super(ResponseStatus.NOT_FOUND, message);
	}
}

export class ForbiddenResponse extends ApiResponse {
	constructor(message = "Forbidden") {
		super(ResponseStatus.FORBIDDEN, message);
	}
}
