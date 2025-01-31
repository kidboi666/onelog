import { FETCH_URL } from '@/src/constants'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
} from '@/src/types/dtos/post'
import { ILikedPost, IPost, IPostDetail } from '@/src/types/entities/post'
import { IPostBaseAdapter } from '@/src/types/services/index'
import { fetcher } from '@/src/utils/fetcher'

export const createNestPostAdapter = (): IPostBaseAdapter => {
  const getAllPosts = async (params: IGetAllPosts): Promise<IPost[]> => {
    try {
      return await fetcher.get<IPost[]>(
        FETCH_URL.POST.GET_POSTS(params.pageParam, params.limit),
      )
    } catch (err) {
      throw err
    }
  }

  const getPost = async (params: IGetPost): Promise<IPostDetail> => {
    try {
      return await fetcher.get<IPostDetail>(
        FETCH_URL.POST.GET_POST(params.postId),
      )
    } catch (err) {
      throw err
    }
  }

  const getLikedPosts = async (
    params: IGetLikedPosts,
  ): Promise<ILikedPost[]> => {
    try {
      return await fetcher.get<ILikedPost[]>(
        FETCH_URL.POST.GET_LIKED_POSTS(params.authorId),
      )
    } catch (err) {
      throw err
    }
  }

  const getUserPostsThatDay = async (
    params: IGetUserPostsThatDay,
  ): Promise<IPost[]> => {
    try {
      return await fetcher.get(FETCH_URL.POST.GET_POSTS_THAT_DAY(params))
    } catch (err) {
      throw err
    }
  }

  const createPost = (params: ICreatePost): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const deletePost = (postId: number): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const getUserPosts = (params: IGetAllUserPosts): Promise<IPost[]> => {
    return Promise.resolve([])
  }

  const updatePost = (params: IUpdatePost): Promise<void> => {
    return Promise.resolve(undefined)
  }

  return {
    getAllPosts,
    getPost,
    getLikedPosts,
    getUserPostsThatDay,
    createPost,
    deletePost,
    getUserPosts,
    updatePost,
  }
}
