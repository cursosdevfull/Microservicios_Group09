import { err, ok, Result } from "neverthrow";

import { IError } from "../../helpers/Error";
import { UserCreatedResponse } from "../application/responses/user-create.response";
import { UserLoginResponse } from "../application/responses/user-login.response";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserCreatedDto } from "./dtos/user-created.dto";
import { UserLoginDto } from "./dtos/user-login.dto";
import Model from "./models/user.model";

export type CreateResult = Result<UserCreatedResponse, IError>;
export type FindOneResult = Result<UserLoginResponse, IError>;
export class UserInfrastructure implements UserRepository {
  async create(user: User): Promise<CreateResult> {
    try {
      await Model.create(user.properties());
      return ok(UserCreatedDto.fromDomainToResponse(user));
    } catch (error) {
      const objErr: IError = new IError("Error creating user");
      objErr.status = 500;
      return err(objErr);
    }
  }

  async findUserByEmail(email: string): Promise<FindOneResult> {
    try {
      const user = await Model.findOne({ email });
      return ok(UserLoginDto.fromDataToResponse(user));
    } catch (error) {
      const objErr: IError = new IError("Error login user");
      objErr.status = 500;
      return err(objErr);
    }
  }

  async findUserByRefreshToken(refreshToken: string): Promise<FindOneResult> {
    try {
      const user = await Model.findOne({ refreshToken });
      return ok(UserLoginDto.fromDataToResponse(user));
    } catch (error) {
      const objErr: IError = new IError("Error getting refresh token");
      objErr.status = 500;
      return err(objErr);
    }
  }
}
