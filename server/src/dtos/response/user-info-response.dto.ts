import { Expose } from 'class-transformer';

export class UserInfoResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  aboutMe: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  userName: string;

  @Expose()
  mbti: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
