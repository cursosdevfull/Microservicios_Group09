import { err, ok, Result } from "neverthrow";

import { IError } from "../../helpers/Error";
import { UserCreatedResponse } from "../application/responses/user-create.response";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserCreatedDto } from "./dtos/user-created.dto";
import Model from "./models/user.model";

export type CreateResult = Result<UserCreatedResponse, IError>;

export class UserInfrastructure implements UserRepository {
  async create(user: User): Promise<CreateResult> {
    try {
      await Model.create(user.properties());
      return ok(UserCreatedDto.fromDomainToResponse(user));
    } catch (error) {
      const objErr: IError = new IError("Error creating user");
      return err(objErr);
    }
  }
}
