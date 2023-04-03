import { Request, Response } from "express";

import { UserApplication } from "../../application/user.application";
import { UserFactory } from "../../domain/user.factory";

export default class {
  constructor(private readonly application: UserApplication) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response) {
    const user = UserFactory.create(
      "3fd66ebc-1b64-4a75-be52-4ea97982350e",
      "Jhon",
      Math.random() + "@email.com",
      "ElMundo3sAjeono2023",
      50
    );

    const userCreated = await this.application.create(user);
    res.json(userCreated);
  }
}
