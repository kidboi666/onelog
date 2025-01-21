import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dtos/request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(dto: SignUpUserDto): Promise<User> {
    const user = this.repository.create(dto);
    return await this.repository.save(user);
  }

  async findUserById(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID format. ID must be UUID');
    }
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserInfoById(id: string) {
    const user = await this.repository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.userName',
        'user.avatarUrl',
        'user.aboutMe',
        'user.mbti',
        'user.createdAt',
        'user.updatedAt',
      ])
      .leftJoin('user.followers', 'followers')
      .leftJoin('user.following', 'following')
      .leftJoin('user.posts', 'posts')
      .where('user.id = :id', { id })
      .loadRelationCountAndMap('user.stats.followerCount', 'user.followers')
      .loadRelationCountAndMap('user.stats.followingCount', 'user.following')
      .loadRelationCountAndMap('user.stats.postCount', 'user.posts')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;

    // return {
    //   id: user.id,
    //   email: user.email,
    //   userName: user.userName,
    //   avatarUrl: user.avatarUrl,
    //   aboutMe: user.aboutMe,
    //   mbti: user.mbti,
    //   stats: {
    //     followerCount: user.followerCount,
    //     followingCount: user.followingCount,
    //     postCount: user.postCount,
    //   },
    //   createdAt: user.createdAt,
    //   updatedAt: user.updatedAt,
    // };
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  async updateUserInfo(id: string, dto: Partial<UpdateUserDto>): Promise<User> {
    await this.findUserById(id);
    await this.repository.update(id, dto);
    return await this.findUserById(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findUserById(id);
    await this.repository.remove(user);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenExp = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.repository.update(userId, {
      refreshToken,
      refreshTokenExp,
    });
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.repository.update(
      { id: userId },
      {
        refreshToken: null,
        refreshTokenExp: null,
      },
    );
  }
}
