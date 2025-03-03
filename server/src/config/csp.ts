import { environment } from "./env";

export const cspConfig =
	environment === "production"
		? {
				directives: {
					defaultSrc: ["'none'"],
					scriptSrc: ["'self'"],
					connectSrc: ["'self'"],
					imgSrc: ["'self'"],
					styleSrc: ["'self'"],
					frameAncestors: ["'self'"],
					formAction: ["'self'"],
					fontSrc: ["'self'", "https:", "data:"],
					objectSrc: ["'none'"],
					scriptSrcAttr: ["'none'"],
					baseUri: ["'self'"],
				},
			}
		: {
				directives: {
					defaultSrc: ["'none'"],
					scriptSrc: ["'self'", "http://localhost:*"],
					connectSrc: ["'self'", "http://localhost:*"],
					imgSrc: ["'self'", "data:"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					frameAncestors: ["'self'"],
					formAction: ["'self'"],
					fontSrc: ["'self'", "https:", "data:"],
					objectSrc: ["'none'"],
					scriptSrcAttr: ["'none'"],
					baseUri: ["'self'"],
				},
			};
