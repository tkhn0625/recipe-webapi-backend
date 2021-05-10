import Container from "typedi";
import { Connection, createConnection, useContainer } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import config from "../config";
import { User } from "../models/user/User";
import { Recipe } from "../models/recipe/Recipe";
import { Flow } from "../models/recipe/Flow";
import { MainImage } from "../models/recipe/MainImage";
import { Material } from "../models/recipe/Material";

export default async (): Promise<Connection> => {
    // read connection options from ormconfig file (or ENV variables)
    // const connectionOptions = await getConnectionOptions();
    const connectionOptions: PostgresConnectionOptions = {
        type: "postgres",
        host: config.database.host,
        port: config.database.port,
        database: config.database.database,
        username: config.database.username,
        password: config.database.password,
        synchronize: true,
        logging: true,

        /**
         * @TODO Should set migration step
         */
        entities: [User, Recipe, MainImage, Material, Flow],
        // cli: {
        //     migrationsDir: "src/models/migration",
        // },
    };

    // typedi + typeorm
    useContainer(Container);

    // create a connection using modified connection options
    const connection = await createConnection(connectionOptions);

    return connection;
};
