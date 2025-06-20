import { CorsOptions } from "cors";
import { environment, docker } from "./env";

const getAllowedOrigins = (): string[] => {
	if (environment === "production") {
		return ["https://<prod-domain>.com"];
	}

	const localOrigins = ["http://localhost:4173"];
	const dockerOrigins = ["http://ui-blog:4173"];

	return docker ? [...localOrigins, ...dockerOrigins] : localOrigins;
};

export const corsOptions: CorsOptions = {
	origin: getAllowedOrigins(),
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
};
