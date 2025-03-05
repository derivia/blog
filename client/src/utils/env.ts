export const ENVIRONMENT = import.meta.env.MODE as string;
export const BASE_URL = import.meta.env.PROD
	? "https://<production-domain>/api"
	: "http://localhost:3030/api";
