import { DataSource } from "typeorm";
import { environment } from "./config/env";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "bloguser",
	password: "blogpass",
	database: "blogdb",
	synchronize: environment.toLowerCase() === "development", // sincroniza automaticamente entidades com o banco
	logging: true,
	entities: [__dirname + "/models/*.ts"],
	migrations: [__dirname + "/migrations/*.ts"],
	subscribers: [__dirname + "/subscribers/*.ts"],
});
