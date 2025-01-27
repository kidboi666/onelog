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
      return await fetcher.get<IPost[]>(
        FETCH_URL.POST.GET_POSTS(params.pageParam, params.limit),
      )
    } catch (err) {
      throw err
    }
  }

  async getPost(params: IGetPost): Promise<IPostDetail> {
    try {
      return await fetcher.get<IPostDetail>(
        FETCH_URL.POST.GET_POST(params.postId),
      )
    } catch (err) {
      throw err
    }
  }

  async getLikedPosts(params: IGetLikedPosts): Promise<ILikedPost[]> {
    try {
      return await fetcher.get<ILikedPost[]>(
        FETCH_URL.POST.GET_LIKED_POSTS(params.authorId),
      )
    } catch (err) {
      throw err
    }
  }

  async getUserPostsThatDay(params: IGetUserPostsThatDay): Promise<IPost[]> {
    try {
      return await fetcher.get(FETCH_URL.POST.GET_POSTS_THAT_DAY(params))
    } catch (err) {
      throw err
    }
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
