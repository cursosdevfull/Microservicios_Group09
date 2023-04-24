import jwt from "jsonwebtoken";

import Parameters from "../../../helpers/Parameters";

export class TokensService {
  static generateAccessToken(user: any): string {
    const payload = { user: user.name };
    return jwt.sign(payload, Parameters.TOKEN_SECRET_KEY, {
      expiresIn: `${Parameters.TOKEN_TIME_EXPIRES}m`,
    });
  }

  static validateAccessToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.verify(token, Parameters.TOKEN_SECRET_KEY);
        resolve(true);
      } catch (error) {
        reject(false);
        //logger.info(error);
      }
    });
  }
}
