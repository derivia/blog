import { DataSource } from "typeorm";
import { environment } from "./config/env";

export const AppDataSource = new DataSource({
    type: "<db>",
    host: "localhost",
    port: <port>,
    username: "<db_username>",
    password: "<db_password>",
    database: "<db_name>",
    synchronize: environment.toLowerCase() === "development", // sincroniza automaticamente entidades com o banco
    logging: true,
    entities: [__dirname + "/models/*.ts"],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [__dirname + "/subscribers/*.ts"],
});
