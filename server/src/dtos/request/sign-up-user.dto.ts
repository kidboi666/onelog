import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class SignUpUserDto {
  @IsEmail()
  @IsString()
  @MaxLength(60)
  email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  password: string;
}
