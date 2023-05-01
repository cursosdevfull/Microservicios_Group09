import { Router } from "express";

import { AutenticationMiddleware } from "../middlewares/authentication.middleware";
import Controller from "./controller";

export default class {
  private readonly expressRouter: Router;

  constructor(private readonly controller: Controller) {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.post(
      "/appointment",
      AutenticationMiddleware.validateToken,
      this.controller.requestAppointment
    );
  }

  get router() {
    return this.expressRouter;
  }
}
