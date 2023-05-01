import axios, { AxiosRequestConfig } from "axios";
import { NextFunction, Request, Response } from "express";

export class AutenticationMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const parts = token.split(" ");
    if (parts.length !== 2) {
      return res.status(401).json({ error: "Token error" });
    }
    const [scheme, tokenValue] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: "Token malformatted" });
    }

    const request: AxiosRequestConfig<any> = {
      method: "POST",
      url: "http://localhost:6100/user/validate-token",
      responseType: "json",
      data: { token: tokenValue },
    };

    try {
      const result = await axios(request);

      if (result.data.valid) {
        next();
      } else {
        res.status(411).send("Token invalid");
      }
    } catch (error) {}
  }
}
