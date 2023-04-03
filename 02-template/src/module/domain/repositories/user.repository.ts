import { UserCreatedResponse } from "../../application/responses/user-create.response";
import { User } from "../user";

export interface UserRepository {
  create(user: User): Promise<UserCreatedResponse>;
}
