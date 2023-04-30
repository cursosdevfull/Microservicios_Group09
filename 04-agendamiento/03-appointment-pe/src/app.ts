import express, { Application, NextFunction, Request, Response } from 'express';

import { IError, ResponseError } from './helpers/Error';
import Parameters from './helpers/Parameters';
import { AppointmentApplication } from './module/application/appointment.application';
import { BrokerApplication } from './module/application/broker.application';
import { BrokerRepository } from './module/domain/repositories/broker.repository';
import { BrokerInfrastructure } from './module/infrastructure/broker.infrastructure';
import AppointmentController from './module/interfaces/http/appointment.controller';
import Routes from './module/interfaces/http/routes';

//import { AppointmentRepository } from "./module/domain/repositories/appointment.repository";
class App {
  private readonly expressApp: Application;

  constructor(private readonly controller: AppointmentController) {
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
    this.expressApp.use("/appointment", new Routes(this.controller).router);
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

const brokerInfrastructure: BrokerRepository = new BrokerInfrastructure();
const brokerApplication = new BrokerApplication(brokerInfrastructure)
const appointmentApplication = new AppointmentApplication(brokerApplication);
const appointmentController = new AppointmentController(appointmentApplication);

export default new App(appointmentController).app;
