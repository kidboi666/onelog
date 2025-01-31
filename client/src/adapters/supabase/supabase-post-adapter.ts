import {
  addUserFilter,
  handleError,
  processQuery,
} from '@/src/adapters/query-helpers'
import { SUPABASE_QUERY } from '@/src/constants/index'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
} from '@/src/types/dtos/post'
import {
  ILikedPost,
  IPost,
  IPostDetail,
  ISupabasePost,
} from '@/src/types/entities/post'
import { Access } from '@/src/types/enums/index'
import { IPostBaseAdapter } from '@/src/types/services/index'

export const createSupabasePostAdapter = (
  supabase: SupabaseClient,
): IPostBaseAdapter => {
  // 모든 게시물 가져오기
  const getAllPosts = async (params: IGetAllPosts) => {
    let query = supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.POST.GET_POSTS_WITH_AUTHOR_INFO)
      .eq('access_type', Access.PUBLIC)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = addUserFilter(query, undefined, params.meId)
    return processQuery(query)
  }

  // 좋아요한 게시물 가져오기
  const getLikedPosts = async (params: IGetLikedPosts) => {
    let query = supabase
      .from('like')
      .select<string, ILikedPost>(
        SUPABASE_QUERY.POST.GET_LIKED_POSTS_WITH_AUTHOR_INFO,
      )
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = addUserFilter(query, params.authorId, params.meId)
    const data = await processQuery(query)
    const isMe = isCurrentUserAuthor(params.authorId, params.meId)
    return filterPrivateLikedPosts(data, isMe)
  }

  // 특정 게시물 상세 정보 가져오기
  const getPost = async (params: IGetPost): Promise<IPostDetail | null> => {
    if (!params.postId) return null

    let query = supabase
      .from('post')
      .select<
        string,
        IPostDetail
      >(SUPABASE_QUERY.POST.GET_POST_DETAIL_WITH_AUTHOR_INFO_AND_COMMENTS)
      .eq('id', params.postId)
      .single()

    query = addUserFilter(query, undefined, params.meId)
    return processQuery(query)
  }

  // 특정 날짜의 유저 게시물 가져오기
  const getUserPostsThatDay = async (params: IGetUserPostsThatDay) => {
    let query = supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.POST.GET_POSTS_WITH_AUTHOR_INFO)
      .gte('created_at', params.startOfDay)
      .lte('created_at', params.endOfDay)
      .eq('like.user_id', params.authorId)
      .order('created_at', { ascending: false })

    query = addUserFilter(query, params.authorId, params.meId)
    const data = await processQuery(query)
    const isMe = isCurrentUserAuthor(params.authorId, params.meId)
    return filterPrivatePosts(data, isMe)
  }

  // 유저의 모든 게시물 가져오기
  const getUserPosts = async (params: IGetAllUserPosts) => {
    let query = supabase
      .from('post')
      .select<string, IPost>(SUPABASE_QUERY.POST.GET_POSTS_WITH_AUTHOR_INFO)
      .eq('post_type', params.postType)
      .order('created_at', { ascending: false })
      .range(params.pageParam, params.pageParam + params.limit - 1)

    query = addUserFilter(query, params.authorId, params.meId)
    const data = await processQuery(query)
    const isMe = isCurrentUserAuthor(params.authorId, params.meId)
    return filterPrivatePosts(data, isMe)
  }

  // 게시물 생성
  const createPost = async (params: ICreatePost) => {
    const { error } = await supabase
      .from('post')
      .insert({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .select()
    handleError(error)
  }

  // 게시물 삭제
  const deletePost = async (postId: number) => {
    const { error } = await supabase.from('post').delete().eq('id', postId)
    handleError(error)
  }

  // 게시물 수정
  const updatePost = async (params: IUpdatePost) => {
    const { error } = await supabase
      .from('post')
      .update({
        ...params,
        emotion_level: params.emotionLevel,
        access_type: params.accessType,
        post_type: params.postType,
      })
      .eq('id', params.id)
    handleError(error)
  }

  // 현재 유저가 작성자인지 체크하는 헬퍼
  const isCurrentUserAuthor = (authorId: string, meId?: string | null) =>
    authorId === meId

  // private 좋아요 게시물 필터링
  const filterPrivateLikedPosts = (
    data: ILikedPost[] | null,
    isMe: boolean,
  ): ILikedPost[] => {
    if (!data) return []
    return isMe
      ? data
      : data.map((item) =>
          item.post.accessType === Access.PUBLIC
            ? item
            : { ...item, post: { ...item.post, title: null, content: '' } },
        )
  }

  // private 게시물 필터링
  const filterPrivatePosts = (
    data: ISupabasePost[],
    isMe: boolean,
  ): IPost[] => {
    if (!data) return []
    return isMe
      ? data
      : data.map((item) =>
          item.accessType === Access.PUBLIC
            ? item
            : { ...item, title: null, content: '' },
        )
  }

  return {
    getAllPosts,
    getLikedPosts,
    getPost,
    getUserPostsThatDay,
    getUserPosts,
    createPost,
    deletePost,
    updatePost,
  }
}
