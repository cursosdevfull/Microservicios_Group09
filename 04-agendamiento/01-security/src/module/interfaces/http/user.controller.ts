import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { IError } from "../../../helpers/Error";
import { UserApplication } from "../../application/user.application";
import { UserFactory } from "../../domain/user.factory";
import { CreateUserValidator } from "./validators/create-user";
import { GenerateNewAccessToken } from "./validators/get-access-token";
import { LoginValidator } from "./validators/login";
import { ValidatorToken } from "./validators/validate-token";

export default class {
  constructor(private readonly application: UserApplication) {
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.validateToken = this.validateToken.bind(this);
    this.generateNewAccessToken = this.generateNewAccessToken.bind(this);
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const createUserValidator = new CreateUserValidator();
    createUserValidator.name = req.body.name;
    createUserValidator.email = req.body.email;
    createUserValidator.password = req.body.password;

    const errors = await validate(createUserValidator);
    if (errors.length > 0) {
      const error = new IError();
      error.message = errors.toString();
      error.status = 411;
      error.stack = errors.toString();

      return next(error);
    }

    const userResult = await UserFactory.create(
      uuidv4(),
      req.body.name,
      req.body.email,
      req.body.password
    );

    if (userResult.isErr()) {
      const error = new IError();
      error.message = userResult.error.message;
      error.status = userResult.error.status;
      error.stack = userResult.error.stack;

      return next(error);
    }

    const userCreated = await this.application.create(userResult.value);

    if (userCreated.isErr()) {
      const error = new IError();
      error.message = userCreated.error.message;
      error.status = userCreated.error.status;
      error.stack = userCreated.error.stack;

      return next(error);
    }

    res.json(userCreated.value);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const loginValidator = new LoginValidator();
    loginValidator.email = req.body.email;
    loginValidator.password = req.body.password;

    const errors = await validate(loginValidator);
    if (errors.length > 0) {
      const error = new IError();
      error.message = errors.toString();
      error.status = 411;
      error.stack = errors.toString();

      return next(error);
    }

    const { email, password } = req.body;
    const loginResult = await this.application.login(email, password);

    if (loginResult.isErr()) {
      const error = new IError();
      error.message = loginResult.error.message;
      error.status = loginResult.error.status;
      error.stack = loginResult.error.stack;

      return next(error);
    }

    res.json(loginResult.value);
  }

  async validateToken(req: Request, res: Response, next: NextFunction) {
    const validatorToken = new ValidatorToken();
    validatorToken.token = req.body.token;

    const errors = await validate(validatorToken);

    if (errors.length > 0) {
      const error = new IError();
      error.message = errors.toString();
      error.status = 411;
      error.stack = errors.toString();

      return next(error);
    }

    const isValid = await this.application.validateAccessToken(req.body.token);

    return res.json({ valid: isValid });
  }

  async generateNewAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const validator = new GenerateNewAccessToken();
    validator.refreshToken = req.body.refreshToken;

    const errors = await validate(validator);

    if (errors.length > 0) {
      const error = new IError();
      error.message = errors.toString();
      error.status = 411;
      error.stack = errors.toString();

      return next(error);
    }

    const tokens = await this.application.getNewAccessToken(
      req.body.refreshToken
    );

    return res.json(tokens);
  }
}
