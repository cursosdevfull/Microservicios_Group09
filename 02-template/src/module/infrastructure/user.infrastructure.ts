import { UserCreatedResponse } from "../application/responses/user-create.response";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserCreatedDto } from "./dtos/user-created.dto";
import Model from "./models/user.model";

export class UserInfrastructure implements UserRepository {
  async create(user: User): Promise<UserCreatedResponse> {
    try {
      const userCreated = user.properties();
      await Model.create(user.properties());
      return UserCreatedDto.fromDomainToResponse(user);
    } catch (error) {
      throw new Error(error);
    }
  }
}
