export const ENVIRONMENT = import.meta.env.MODE as string;
export const API_BASE_URL = import.meta.env.PROD
	? "http://api-blog:3030/api"
	: "http://localhost:3030/api";
