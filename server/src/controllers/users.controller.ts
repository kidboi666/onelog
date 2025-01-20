import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserInfoDto } from '../dtos/response/user-info.dto';
import { Serialize } from '../decorators/serialize.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserInfoDto)
  @Get(':userId')
  findById(@Param('userId') userId: string): Promise<User> {
    return this.usersService.findById(userId);
  }

  @Serialize(UserInfoDto)
  @Get(':email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Delete(':userId')
  removeUser(@Param('userId') userId: string): Promise<void> {
    return this.usersService.remove(userId);
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    return this.usersService.update(userId, updateUserDto);
  }
}
