import { validate } from "uuid";

import { UtilsService } from "./services/utils.service";
import { User, UserProperties } from "./user";

export class UserFactory {
  static create(
    id: string,
    name: string,
    email: string,
    password: string,
    age: number
  ) {
    if (!validate(id)) {
      throw new Error("ID is not valid");
    }

    if (age < 18) {
      throw new Error("User must be over 18 years old");
    }

    if (!UtilsService.validatePassword(password)) {
      throw new Error("Password invalid");
    }

    if (name.length < 3) {
      throw new Error("Name must be at least 3 characters long");
    }

    if (!UtilsService.validateEmail(email)) {
      throw new Error("Email invalid");
    }

    const userProperties: UserProperties = {
      id,
      name,
      email,
      password,
      age,
    };

    return new User(userProperties);
  }
}
