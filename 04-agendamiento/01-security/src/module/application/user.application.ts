import { err, ok, Result } from "neverthrow";

import { IError } from "../../helpers/Error";
import { UserRepository } from "../domain/repositories/user.repository";
import { CryptService } from "../domain/services/crypt.service";
import { User } from "../domain/user";
import { CreateResult } from "../infrastructure/user.infrastructure";
import { Tokens } from "./interfaces/tokens.interface";
import { TokensService } from "./services/token";

export type LoginResult = Result<Tokens, IError>;
export type GenerateAccessTokenResult = Result<Tokens, IError>;

export class UserApplication {
  constructor(private repository: UserRepository) {}

  async create(user: User): Promise<CreateResult> {
    return await this.repository.create(user);
  }

  async login(email: string, password: string): Promise<LoginResult> {
    const findUserResult = await this.repository.findUserByEmail(
      email,
      password
    );

    if (findUserResult.isErr()) {
      const error = new IError();
      error.message = findUserResult.error.message;
      error.status = findUserResult.error.status;
      error.stack = findUserResult.error.stack;

      return err(error);
    }

    const user = findUserResult.value;

    const isMatch = await CryptService.compare(password, user.password);

    if (!isMatch) {
      const error = new IError();
      error.message = "Password invalid";
      error.status = 411;
      error.stack = "";

      return err(error);
    } else {
      const tokens: Tokens = {
        accessToken: TokensService.generateAccessToken(user),
        refreshToken: user.refreshToken,
      };

      return ok(tokens);
    }
  }

  async validateAccessToken(token: string): Promise<boolean> {
    try {
      const isTokenValid = await TokensService.validateAccessToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getNewAccessToken(token: string): Promise<GenerateAccessTokenResult> {
    const userResult = await this.repository.findUserByRefreshToken(token);

    if (userResult.isErr()) {
      const error = new IError();
      error.message = userResult.error.message;
      error.status = userResult.error.status;
      error.stack = userResult.error.stack;

      return err(error);
    }

    const user = userResult.value;

    const tokens: Tokens = {
      accessToken: TokensService.generateAccessToken(user),
      refreshToken: user.refreshToken,
    };

    return ok(tokens);
  }
}
