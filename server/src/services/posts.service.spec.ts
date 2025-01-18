import request from 'supertest';
import { PostsService } from './posts.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsModule } from '../modules/posts.module';
import { DataSource } from 'typeorm';

describe('PostsService', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let postsService = {
    findAll: () => ['test'],
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    // dataSource = new DataSource(dbConfig);
  });

  test('GET /posts', () => {
    return request(app.getHttpServer()).get('/posts').expect(200).expect({
      data: postsService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
