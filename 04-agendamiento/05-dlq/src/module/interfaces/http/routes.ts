import { Router } from "express";

import Controller from "./appointment.controller";

export default class {
  private readonly expressRouter: Router;

  constructor(private readonly controller: Controller) {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.post("/", this.controller.create);
  }

  get router() {
    return this.expressRouter;
  }
}
