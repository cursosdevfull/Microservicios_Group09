import { NextFunction, Request, Response } from "express";

import { Application } from "../../application/application";

export default class {
  constructor(private readonly application: Application) {
    this.requestAppointment = this.requestAppointment.bind(this);
  }

  async requestAppointment(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    const target = "http://localhost:3000/appointment";

    const result = await this.application.requestAppointment(target, data);

    res.json(result);
  }

  /*   async create(req: Request, res: Response, next: NextFunction) {
    const user = UserFactory.create(
      req.body.id,
      req.body.name,
      req.body.email,
      req.body.password,
      +req.body.age
    );

    const userCreated = await this.application.create(user);

    if (userCreated.isErr()) {
      const error = new IError();
      error.message = userCreated.error.message;
      error.status = userCreated.error.status;
      error.stack = userCreated.error.stack;

      return next(error);
    }

    res.json(userCreated.value);
  } */
}
