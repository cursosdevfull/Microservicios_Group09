import express, { Application, NextFunction, Request, Response } from "express";

import { IError, ResponseError } from "./helpers/Error";
import Parameters from "./helpers/Parameters";
import { Application as ApplicationLogic } from "./module/application/application";
import { Repository } from "./module/domain/repositories/repository";
import { Infrastructure } from "./module/infrastructure/infrastructure";
import Controller from "./module/interfaces/http/controller";
import Routes from "./module/interfaces/http/routes";

class App {
  private readonly expressApp: Application;

  constructor(private readonly controller: Controller) {
    this.expressApp = express();

    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  mountMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountRoutes() {
    this.expressApp.use("/api", new Routes(this.controller).router);
  }

  mountErrorHandlers() {
    this.expressApp.use((req: Request, res: Response, next: NextFunction) => {
      const error = new IError("Not found");
      error.status = 404;
      next(error);
    });

    this.expressApp.use(
      (err: IError, req: Request, res: Response, next: NextFunction) => {
        const objError: ResponseError = {
          name: err.name,
          message: err.message,
        };

        if (Parameters.ENVIRONMENT !== "production") {
          objError.stack = err.stack;
        }

        res.status(err.status || 500).json(objError);
      }
    );
  }

  get app() {
    return this.expressApp;
  }
}
const infrastructure: Repository = new Infrastructure();
const application = new ApplicationLogic(infrastructure);
const controller = new Controller(application);

export default new App(controller).app;
