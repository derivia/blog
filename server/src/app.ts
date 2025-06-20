import { debug } from "console";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { api_port } from "./config/env";
import { ApiError, InternalError } from "./core/error";
import { NotFoundResponse } from "./core/response";
import { cspConfig } from "./config/csp";
import { AppDataSource } from "./data-source";
import postRouter from "./routers/post.router";
import loginRouter from "./routers/login.router";

const app = express();
app.use(helmet.contentSecurityPolicy(cspConfig));
app.disable("x-powered-by");

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
const port = api_port || 3000;

async function initializeDatabase() {
	try {
		await AppDataSource.initialize();
		console.log("[Database] Data Source initialized.");
	} catch (error) {
		console.error("[Database] Error during Data Source initialization:", error);
		process.exit(1);
	}
}

async function startServer() {
	await initializeDatabase();

	// imported things like routers and middlewares (after security, db & json configuration)
	app.use("/api/posts", postRouter);
	app.use("/api/login", loginRouter);

	// default unknown endpoint response
	app.use((_req: Request, res: Response) => {
		return new NotFoundResponse("Not found").send(res);
	});

	const server = app.listen(port, () => {
		console.log("[Server] listening on port " + port);
	});

	// error handler middleware
	app.use(
		(err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
			if (err instanceof ApiError) {
				ApiError.handle(err, res);
			} else {
				ApiError.handle(new InternalError(), res);
			}
		},
	);

	process.on("SIGTERM", () => {
		debug("Gracefully stopping HTTP server.");
		server.close(() => {
			debug("Server closed.");
		});
	});
}

startServer();
