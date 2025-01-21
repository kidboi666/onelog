import { Expose } from 'class-transformer';

export class TokensResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
