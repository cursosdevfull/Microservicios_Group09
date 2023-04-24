import { IsNotEmpty, IsString } from "class-validator";

export class ValidatorToken {
  @IsNotEmpty()
  @IsString()
  token: string;
}
