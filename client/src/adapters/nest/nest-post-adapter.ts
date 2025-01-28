'use client'

import { FETCH_URL } from '@/src/constants'
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

  createPost(params: ICreatePost): Promise<void> {
    return Promise.resolve(undefined)
  }

  deletePost(postId: number): Promise<void> {
    return Promise.resolve(undefined)
  }

  getUserPosts(params: IGetAllUserPosts): Promise<IPost[]> {
    return Promise.resolve([])
  }

  updatePost(params: IUpdatePost): Promise<void> {
    return Promise.resolve(undefined)
  }
}
