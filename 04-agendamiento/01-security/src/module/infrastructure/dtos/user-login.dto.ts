import { plainToInstance } from "class-transformer";

import { UserLoginResponse } from "../../application/responses/user-login.response";

export class UserLoginDto {
  static fromDataToResponse(user: any): UserLoginResponse {
    return plainToInstance(UserLoginResponse, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      refreshToken: user.refreshToken,
    });
  }
}
