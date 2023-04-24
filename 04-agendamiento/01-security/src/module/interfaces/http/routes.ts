import { Router } from "express";

import Controller from "./user.controller";

export default class {
  private readonly expressRouter: Router;

  constructor(private readonly controller: Controller) {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.post("/", this.controller.create);
    this.expressRouter.post("/login", this.controller.login);
    this.expressRouter.post("/validate-token", this.controller.validateToken);
    this.expressRouter.post(
      "/get-new-access-token",
      this.controller.generateNewAccessToken
    );
  }

  get router() {
    return this.expressRouter;
  }
}
