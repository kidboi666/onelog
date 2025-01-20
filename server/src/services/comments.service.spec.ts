import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AccessType, EmotionLevel, PostType } from '../types/enums.type';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('findAll should return an array of posts', async () => {
    const expectedPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    mockRepository.find.mockResolvedValue(expectedPosts);

    const result = await service.findAllPaginatedPosts();

    expect(result).toEqual(expectedPosts);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('findOne should return a post by id', async () => {
    const expectedPost = { id: 1, title: 'Post 1' };
    mockRepository.findOne.mockResolvedValue(expectedPost);

    const result = await service.findOne(1);

    expect(result).toEqual(expectedPost);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('create', async () => {
    const createPostDto = {
      title: 'New Post',
      postType: PostType.JOURNAL,
      accessType: AccessType.PUBLIC,
      tags: ['tag1', 'tag2'],
      userId: uuidv4(),
      emotionLevel: EmotionLevel['75%'],
      content: 'Content',
    };
    const newPost = { id: 1, ...createPostDto };

    mockRepository.create.mockReturnValue(newPost);
    mockRepository.save.mockResolvedValue(newPost);

    const result = await service.createPost(createPostDto);

    expect(result).toEqual(newPost);
    expect(mockRepository.create).toHaveBeenCalledWith({
      title: createPostDto.title,
      postType: createPostDto.postType,
      accessType: createPostDto.accessType,
      tags: createPostDto.tags,
      userId: createPostDto.userId,
      emotionLevel: createPostDto.emotionLevel,
      content: createPostDto.content,
    });
    expect(mockRepository.save).toHaveBeenCalledWith(newPost);
  });

  it('update should update a post', async () => {
    const updatePostDto = {
      title: 'Updated Post',
      postType: PostType.JOURNAL,
      accessType: AccessType.PUBLIC,
      tags: ['tag1', 'tag2'],
      userId: uuidv4(),
      emotionLevel: EmotionLevel['50%'],
      content: 'Updated Content',
    };

    await service.updatePost(1, updatePostDto);

    expect(mockRepository.update).toHaveBeenCalledWith(1, {
      title: updatePostDto.title,
      postType: updatePostDto.postType,
      accessType: updatePostDto.accessType,
      tags: updatePostDto.tags,
      userId: updatePostDto.userId,
      emotionLevel: updatePostDto.emotionLevel,
      content: updatePostDto.content,
    });
  });

  it('delete should delete a post if it exists', async () => {
    const post = { id: 1, title: 'Post 1' };
    mockRepository.findOne.mockResolvedValue(post);

    await service.deletePost(1);

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if post does not exist', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.deletePost(1)).rejects.toThrow(NotFoundException);
    expect(mockRepository.delete).not.toHaveBeenCalled();
  });
});
