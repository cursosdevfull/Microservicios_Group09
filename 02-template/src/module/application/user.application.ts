import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/user";
import { CreateResult } from "../infrastructure/user.infrastructure";

export class UserApplication {
  constructor(private repository: UserRepository) {}

  async create(user: User): Promise<CreateResult> {
    return await this.repository.create(user);
  }
}
