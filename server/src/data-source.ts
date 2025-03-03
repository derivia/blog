import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "bloguser",
	password: "blogpass",
	database: "blogdb",
	synchronize: false,
	logging: true,
	entities: [__dirname + "/models/*.ts"],
	migrations: [__dirname + "/migrations/*.ts"],
	subscribers: [__dirname + "/subscribers/*.ts"],
});
