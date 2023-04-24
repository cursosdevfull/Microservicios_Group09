import mongoose from "mongoose";

import logger from "../helpers/Logger";
import Parameters from "../helpers/Parameters";
import { Bootstrap } from "./bootstrap";

export default class DatabaseBootstrap extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const { username, password, database, host, port, authSource } =
        this.dbConfig();

      const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;

      const options = { maxPoolSize: 10 };

      mongoose
        .connect(url, options)
        .then(() => {
          resolve(true);
          logger.info("Database is connected");
        })
        .catch((err) => {
          reject(err);
          logger.info("Database is not connected");
        });
    });
  }

  dbConfig() {
    return {
      username: Parameters.MONGO_USERNAME,
      password: Parameters.MONGO_PASSWORD,
      database: Parameters.MONGO_DATABASE,
      host: Parameters.MONGO_HOST,
      port: Parameters.MONGO_PORT,
      authSource: Parameters.MONGO_AUTH_SOURCE,
    };
  }
}
