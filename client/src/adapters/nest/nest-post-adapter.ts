import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IPost,
  IPostBaseAdapter,
  IPostDetail,
} from '@/src/types/post'

export class NestPostAdapter implements IPostBaseAdapter {
  getAllPosts({ meId, pageParam, limit }: IGetAllPosts): Promise<IPost[]> {
    throw new Error('Method not implemented.')
  }

  getPost({ postId, meId }: IGetPost): Promise<IPostDetail> {
    throw new Error('Method not implemented.')
  }

  getLikedPosts({
    authorId,
    meId,
    pageParam,
    limit,
  }: IGetLikedPosts): Promise<IPost[]> {
    throw new Error('Method not implemented.')
  }

  getUserPostThatDay({
    authorId,
    startOfDay,
    endOfDay,
    meId,
  }: IGetUserPostsThatDay): Promise<IPost[]> {
    throw new Error('Method not implemented.')
  }

  getAllUserPosts({
    authorId,
    postType,
    pageParam,
    limit,
  }: IGetAllUserPosts): Promise<IPost[]> {
    throw new Error('Method not implemented.')
  }

  createPost({
    title,
    content,
    emotionLevel,
    tags,
    accessType,
    postType,
  }: ICreatePost): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
