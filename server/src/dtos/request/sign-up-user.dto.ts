import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignUpUserDto {
  @IsEmail()
  @IsString()
  @MaxLength(60)
  @Transform((params) => params.value.trim())
  email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
