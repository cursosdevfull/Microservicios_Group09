import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

import { IError } from "../../helpers/Error";
import { CryptService } from "./services/crypt.service";
import { UtilsService } from "./services/utils.service";
import { User, UserProperties } from "./user";

export type CreateResult = Result<User, IError>;

export class UserFactory {
  static async create(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<CreateResult> {
    if (!validate(id)) {
      const error = new IError();
      error.message = "ID is not valid";
      error.status = 411;
      error.stack = "";
      return err(error);
    }

    if (!UtilsService.validatePassword(password)) {
      const error = new IError();
      error.message = "Password invalid";
      error.status = 411;
      error.stack = "";
      return err(error);
    }

    if (name.length < 3) {
      const error = new IError();
      error.message = "Name must be at least 3 characters long";
      error.status = 411;
      error.stack = "";
      return err(error);
    }

    if (!UtilsService.validateEmail(email)) {
      const error = new IError();
      error.message = "Email invalid";
      error.status = 411;
      error.stack = "";
      return err(error);
    }

    const passwordCipher = await CryptService.cipher(password);
    const userProperties: UserProperties = {
      id,
      name,
      email,
      password: passwordCipher,
    };

    return ok(new User(userProperties));
  }
}
