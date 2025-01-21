import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInUserDto {
  @IsEmail()
  @Transform((params) => params.value.trim())
  email: string;

  @IsString()
  password: string;
}
