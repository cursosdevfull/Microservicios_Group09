import {
  CreateResult,
  FindOneResult,
} from "../../infrastructure/user.infrastructure";
import { User } from "../user";

export interface UserRepository {
  create(user: User): Promise<CreateResult>;
  findUserByEmail(email: string, password: string): Promise<FindOneResult>;
  findUserByRefreshToken(refreshToken: string): Promise<FindOneResult>;
}
