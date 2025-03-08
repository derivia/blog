import { environment, docker } from "./env";

const getHosts = () => {
	const hosts = ["'self'"];

	if (environment === "development") {
		hosts.push("http://localhost:*");

		if (docker === "true") {
			hosts.push("http://ui-blog:*");
			hosts.push("http://api-blog:*");
		}
	}

	return hosts;
};

export const cspConfig = {
	directives: {
		defaultSrc: ["'none'"],
		scriptSrc: getHosts(),
		connectSrc: getHosts(),
		imgSrc: ["'self'", "data:"],
		styleSrc:
			environment === "production" ? ["'self'"] : ["'self'", "'unsafe-inline'"],
		frameAncestors: ["'self'"],
		formAction: ["'self'"],
		fontSrc: ["'self'", "https:", "data:"],
		objectSrc: ["'none'"],
		scriptSrcAttr: ["'none'"],
		baseUri: ["'self'"],
	},
};
