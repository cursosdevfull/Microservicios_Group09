import { plainToInstance } from "class-transformer";

import { UserCreatedResponse } from "../../application/responses/user-create.response";
import { User } from "../../domain/user";

export class UserCreatedDto {
  static fromDomainToResponse(user: User): UserCreatedResponse {
    return plainToInstance(UserCreatedResponse, user.properties());
  }
}
