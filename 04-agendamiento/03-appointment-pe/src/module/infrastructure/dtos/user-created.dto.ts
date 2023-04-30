import { plainToInstance } from "class-transformer";

import { UserCreatedResponse } from "../../application/responses/user-create.response";
import { User } from "../../domain/appointment";

export class UserCreatedDto {
  static fromDomainToResponse(user: User): UserCreatedResponse {
    return plainToInstance(UserCreatedResponse, user.properties());
  }
}
