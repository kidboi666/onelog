import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { AuthService } from '../services/auth.service';
import { v4 as uuidv4 } from 'uuid';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: AuthService;

  beforeEach(async () => {
    const users: User[] = [];
    usersService = {
      findUserByEmail: (email: string) => {
        const foundUser = users.find((user) => user.email === email);
        return Promise.resolve(foundUser);
      },
      findUserById: (id: string) => {
        const foundUser = users.find((user) => user.id === id);
        return Promise.resolve(foundUser);
      },
      createUser: (signUpUserDto: SignUpUserDto) => {
        const newUser = {
          id: uuidv4(),
          email: signUpUserDto.email,
          password: signUpUserDto.password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    authService = module.get(AuthService);
    usersService = module.get(UsersService);
  });
  test('GET findAll', async () => {
    await authService.signUp({ email: 'asdf@asdf.com', password: 'asdf' });
    await authService.signUp({ email: 'asdf2@asdf.com', password: 'asdf' });
    const users = await controller.findAll();
    expect(users.length).toBe(2);
  });

  test('GET findAll NotFound', async () => {
    const users = await controller.findAll();
    expect(users.length).not.toBeNull();
  });

  test('GET findByEmail', async () => {
    const newUser = await authService.signUp({
      email: 'asdf@asdf.com',
      password: 'asdf',
    });
    const user = await controller.findByEmail(newUser.email);
    expect(user.email).toEqual('asdf@asdf.com');
  });

  test('GET findByEmail NotFound', async () => {
    const user = await controller.findByEmail('asdf@asdf.com');
    expect(user).not.toBeNull();
  });

  test('GET findById', async () => {
    const newUser = await authService.signUp({
      email: 'asdf@asdf.com',
      password: 'asdf',
    });
    const user = await controller.findById(newUser.id);
    expect(user.id).toEqual(newUser.id);
  });

  test('GET findById NotFound', () => {
    usersService.findUserById = () => Promise.resolve(null);
    expect(controller.findById(uuidv4())).resolves.toBeNull();
  });
});
