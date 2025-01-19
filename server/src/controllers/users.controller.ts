import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/request/update-user.dto';
import { UserDto } from '../dtos/response/user.dto';
import { Serialize } from '../decorators/serialize.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Serialize(UserDto)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Serialize(UserDto)
  @Get('/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Serialize(UserDto)
  @Get('/:email')
  findByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
