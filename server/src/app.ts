import { debug } from "console";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { environment, api_port } from "./config/env";
import { ApiError, InternalError } from "./core/error";
import { NotFoundResponse } from "./core/response";
import { cspConfig } from "./config/csp";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
app.use(helmet.contentSecurityPolicy(cspConfig));
app.disable("x-powered-by");

const corsOptions: CorsOptions = {
	origin:
		environment === "development"
			? ["http://localhost:5173", "http://localhost:4173", "http://ui:5173"] // 4173 & 5173 - Vite default ports
			: "https://<production-domain>",
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
const port = api_port || 3030;

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
				if (environment === "development") {
					return res.status(500).send(err);
				} else {
					ApiError.handle(err, res);
				}
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
