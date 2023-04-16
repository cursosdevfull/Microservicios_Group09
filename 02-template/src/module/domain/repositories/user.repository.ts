import { CreateResult } from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  create(user: User): Promise<CreateResult>;
}
