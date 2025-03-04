import { Request, Response, NextFunction } from "express";

type AsyncFunction = (
	req: Request,
	res: Response,
	next?: NextFunction,
) => Promise<any>;

/*
 * Async handler function, used for avoiding multiple try catches
 * Sends error to next function (middleware) [an error handler]
 *
 * Receives an async function as argument to execute (probably one that throws
 * some kind of error)
 */
export const asyncHandler = (asyncFunc: AsyncFunction) => {
	return (req: Request, res: Response, next: NextFunction) => {
		asyncFunc(req, res, next).catch(next);
	};
};
