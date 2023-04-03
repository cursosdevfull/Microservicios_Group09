import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { UserCreatedResponse } from "./responses/user-create.response";

export class UserApplication {
  constructor(private repository: UserRepository) {}

  async create(user: User): Promise<UserCreatedResponse> {
    return await this.repository.create(user);
  }
}
