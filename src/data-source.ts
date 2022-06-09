import "reflect-metadata";
import { DataSource } from "typeorm";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "nadja",
  password: "nadja",
  database: "sentigrate",
  entities: [Country],
  synchronize: true,
});
