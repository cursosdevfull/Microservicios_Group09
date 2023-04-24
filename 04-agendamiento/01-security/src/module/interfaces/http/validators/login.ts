import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginValidator {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;
}
