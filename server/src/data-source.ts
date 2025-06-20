import { DataSource } from "typeorm";
import {
	environment,
	postgres_db,
	postgres_pass,
	postgres_user,
} from "./config/env";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "shared_postgres",
	port: 5432,
	username: postgres_user,
	password: postgres_pass,
	database: postgres_db,
	synchronize: false,
	logging: environment === "development",
	entities: [__dirname + "/models/*.ts"],
	migrations: [__dirname + "/migrations/*.ts"],
	subscribers: [__dirname + "/subscribers/*.ts"],
	cache: environment === "production",
});
