export const ENVIRONMENT = import.meta.env.MODE as string;
const isDocker = import.meta.env.INSIDE_DOCKER === "true";
export const API_BASE_URL = isDocker
	? "http://api-blog:3030/api"
	: "http://localhost:3030/api";
