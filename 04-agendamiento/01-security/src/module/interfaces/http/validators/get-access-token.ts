import { IsNotEmpty, IsString } from "class-validator";

export class GenerateNewAccessToken {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
