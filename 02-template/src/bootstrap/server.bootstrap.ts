import { Application } from "express";
import http from "http";

import Parameters from "../helpers/Parameters";
import { Bootstrap } from "./bootstrap";

export default class ServerBootstrap extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      const port = Parameters.PORT;
      const server = http.createServer(this.app);

      server
        .listen(port)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running on port ${port}`);
        })
        .on("error", (err) => {
          reject(err);
          console.log(`Server is not running on port ${port}`);
        });
    });
  }
}
