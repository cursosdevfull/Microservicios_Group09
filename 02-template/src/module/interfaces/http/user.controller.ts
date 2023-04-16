import { NextFunction, Request, Response } from "express";

import { IError } from "../../../helpers/Error";
import { UserApplication } from "../../application/user.application";
import { UserFactory } from "../../domain/user.factory";

export default class {
  constructor(private readonly application: UserApplication) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
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
  }
}
