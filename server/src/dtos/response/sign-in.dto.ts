import { IsString, IsUUID } from 'class-validator';

export class SignInDto {
  @IsUUID()
  id: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
