import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';
import { v4 as uuidv4 } from 'uuid';

describe('AuthController', () => {
  let controller: AuthController;
  let _usersService: Partial<UsersService>;
  let _authService: Partial<AuthService>;

  beforeEach(async () => {
    const users: User[] = [];
    _usersService = {
      findByEmail: (email: string) => {
        const filteredUser = users.find((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      findById: jest.fn(),
      create: (signUpUserDto: SignUpUserDto) => {
        const newUser = {
          email: signUpUserDto.email,
          password: signUpUserDto.password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    _authService = {
      signUp: jest.fn(),
      signIn: (signInUserDto: SignInUserDto) => {
        return Promise.resolve({
          id: uuidv4(),
          email: signInUserDto.email,
          password: signInUserDto.password,
        } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: _authService,
        },
        {
          provide: UsersService,
          useValue: _usersService,
        },
      ],
    }).compile();

    controller = module.get(AuthController);
  });

  test('POST /signin', async () => {
    const session = { userId: -10 };
    const user = await controller.signIn(
      {
        email: 'asdf@asdf.com',
        password: 'asdf',
      },
      session,
    );
    expect(user.email).toEqual('asdf@asdf.com');
    expect(session.userId).toEqual(user.id);
  });
});
