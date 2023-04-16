import express, { Application, NextFunction, Request, Response } from "express";

import { IError, ResponseError } from "./helpers/Error";
import Parameters from "./helpers/Parameters";
import { UserApplication } from "./module/application/user.application";
import { UserRepository } from "./module/domain/repositories/user.repository";
import { UserInfrastructure } from "./module/infrastructure/user.infrastructure";
import Routes from "./module/interfaces/http/routes";
import UserController from "./module/interfaces/http/user.controller";

class App {
  private readonly expressApp: Application;

  constructor(private readonly controller: UserController) {
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

const userInfrastructure: UserRepository = new UserInfrastructure();
const userApplication = new UserApplication(userInfrastructure);
const userController = new UserController(userApplication);

export default new App(userController).app;
