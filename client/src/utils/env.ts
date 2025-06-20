export const ENVIRONMENT = import.meta.env.MODE as string;
const isDocker = import.meta.env.INSIDE_DOCKER === "true";
export const API_BASE_URL = isDocker
	? "http://api-blog:3000/api"
	: "https://blog.lorrran.com/api";
