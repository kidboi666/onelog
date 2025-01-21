import { Expose } from 'class-transformer';

export class SessionDto {
  @Expose()
  id: string;

  @Expose()
  refreshToken: string;

  @Expose()
  refreshTokenExp: Date;
}
