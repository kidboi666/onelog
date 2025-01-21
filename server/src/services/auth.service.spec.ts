import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    // Create a fake copy of the users service
    fakeUsersService = {
      findUserByEmail: (email: string) => {
        const filteredUser = users.find((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      createUser: (signUpUserDto: SignUpUserDto) => {
        const newUser = {
          email: signUpUserDto.email,
          password: signUpUserDto.password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService, // UsersService 값을 요구할 경우
          useValue: fakeUsersService, // fakeUsersService 의 값을 대신 준다.
        },
        /**
         * DI 시스템을 약간 속이거나 일종의 경로를 바꾸는 객체
         */
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  test('authService 인스턴스 만들기', async () => {
    expect(authService).toBeDefined();
  });

  test('암호화된 비밀번호로 회원가입 하기', async () => {
    const user = await authService.signUp({
      email: 'asdf@asdf.com',
      password: 'asdf',
    });

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  test('사용중인 이메일로 회원가입 할때 예외처리', async () => {
    await authService.signUp({ email: 'asdf@asdf.com', password: 'asdf' });
    await expect(
      authService.signUp({ email: 'asdf@asdf.com', password: 'asdf' }),
    ).rejects.toThrow(BadRequestException);
  });

  test('존재하지 않는 이메일로 로그인 할때 예외처리', async () => {
    await expect(
      authService.signIn({ email: 'asdf@asdf.com', password: 'asdf' }),
    ).rejects.toThrow(NotFoundException);
  });

  test('로그인시 비밀번호가 맞지 않을때 예외처리', async () => {
    await authService.signUp({ email: 'asdf@asdf.com', password: 'asdf' });

    await expect(
      authService.signIn({ email: 'asdf@asdf.com', password: 'asdff' }),
    ).rejects.toThrow(BadRequestException);
  });

  test('정상적으로 로그인 할때', async () => {
    await authService.signUp({ email: 'asdf@asdf.com', password: 'asdf' });

    const user = await authService.signIn({
      email: 'asdf@asdf.com',
      password: 'asdf',
    });
    expect(user).toBeDefined();
  });
});
