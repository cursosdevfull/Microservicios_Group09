import { Expose } from 'class-transformer';

export class UserLoginResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  password: string;

  @Expose()
  refreshToken: string;
}
