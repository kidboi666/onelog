'use client'

import { FETCH_URL } from '@/src/constants'
import Error from 'next/error'
import { undefined } from 'zod'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  ILikedPost,
  IPost,
  IPostBaseAdapter,
  IPostDetail,
  IUpdatePost,
} from '@/src/types/post'
import { fetcher } from '@/src/utils/fetcher'

export class NestPostAdapter implements IPostBaseAdapter {
  async getAllPosts(params: IGetAllPosts): Promise<IPost[]> {
    try {
      return await fetcher.get<IPost[]>(FETCH_URL.POST.GET_ALL)
    } catch (err) {
      throw err
    }
  }

  getPost({ postId, meId }: IGetPost): Promise<IPostDetail> {
    throw new Error('Method not implemented.')
  }

  getLikedPosts({
    authorId,
    meId,
    pageParam,
    limit,
  }: IGetLikedPosts): Promise<ILikedPost[]> {
    throw new Error('Method not implemented.')
  }

  getUserPostsThatDay({
    authorId,
    startOfDay,
    endOfDay,
    meId,
  }: IGetUserPostsThatDay): Promise<IPost[]> {
    throw new Error('Method not implemented.')
  }

  getUserPosts({
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

  deletePost(postId: number): Promise<void> {}

  updatePost(params: IUpdatePost): Promise<void> {
    return Promise.resolve(undefined)
  }
}
