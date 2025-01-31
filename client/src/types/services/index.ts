import { AsyncNullable } from '@/src/types/common/index'
import { ISignIn, ISignUp, IUpdateUserInfo } from '@/src/types/dtos/auth'
import { ICreateComment, IUpdateComment } from '@/src/types/dtos/comment'
import { ICreateFollow, IDeleteFollow } from '@/src/types/dtos/follower'
import { IGetGarden } from '@/src/types/dtos/garden'
import {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
} from '@/src/types/dtos/post'
import { IReport } from '@/src/types/dtos/report'
import {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodoFolder,
  IUpdateTodo,
  IUpdateTodoFolder,
} from '@/src/types/dtos/todo'
import { IUploadAvatar, IUserInfo } from '@/src/types/entities/auth'
import { ILike } from '@/src/types/entities/like'
import { ILikedPost, IPost, IPostDetail } from '@/src/types/entities/post'
import { ITodo } from '@/src/types/entities/todo'
import { IUsedWord, IWord } from '@/src/types/entities/word'

export interface IAuthBaseAdapter {
  signIn: (params: ISignIn) => Promise<any>
  signUp: (params: ISignUp) => Promise<any>
  signOut: () => Promise<void>
  updateUserInfo: (params: IUpdateUserInfo) => AsyncNullable<IUserInfo>
  uploadAvatarImage: (params: IUploadAvatar) => Promise<string>
  deleteAvatarImage: (imageUrl: string) => Promise<void>
}

export interface ICommentBaseAdapter {
  createComment: (params: ICreateComment) => Promise<void>
  deleteComment: (commentId: number) => Promise<void>
  updateComment: (params: IUpdateComment) => Promise<void>
}

export interface IEmotionBaseAdapter {
  getEmotionAverage: (userId: string) => Promise<number>
}

export interface IFollowBaseAdapter {
  getFollowers: (userId: string) => Promise<any>
  getFollowings: (userId: string) => Promise<any>
  getFollowersCount: (userId: string) => Promise<any>
  getFollowingsCount: (userId: string) => Promise<any>
  createFollow: (params: ICreateFollow) => Promise<any>
  deleteFollow: (params: IDeleteFollow) => Promise<any>
}

export interface IGardenBaseAdapter {
  getGarden: (params: IGetGarden) => Promise<any>
}

export interface ILikeBaseAdapter {
  handleLike: (params: ILike) => Promise<void>
}

export interface IPostBaseAdapter {
  getAllPosts: (params: IGetAllPosts) => Promise<IPost[]>
  getPost: (params: IGetPost) => Promise<IPostDetail | null>
  getLikedPosts: (params: IGetLikedPosts) => Promise<ILikedPost[]>
  getUserPostsThatDay: (params: IGetUserPostsThatDay) => Promise<IPost[]>
  getUserPosts: (params: IGetAllUserPosts) => Promise<IPost[]>
  createPost: (params: ICreatePost) => Promise<void>
  deletePost: (postId: number) => Promise<void>
  updatePost: (params: IUpdatePost) => Promise<void>
}

export interface ITodoBaseAdapter {
  getTodoFolder: (meId: string) => Promise<ITodoFolder[]>
  getTodoInProgress: (meId: string) => Promise<ITodo[]>
  getTodoInCompleted: (meId: string) => Promise<ITodo[]>
  getTodoFromFolder: (params: IGetTodoFromFolder) => Promise<ITodo[]>
  getTodoIndex: (params: IGetTodoIndex) => Promise<ITodo[]>
  createTodo: (params: ICreateTodo) => Promise<void>
  createTodoFolder: (params: ICreateTodoFolder) => Promise<void>
  updateTodo: (params: IUpdateTodo) => Promise<void>
  updateTodoFolder: (params: IUpdateTodoFolder) => Promise<void>
  deleteTodo: (params: IDeleteTodo) => Promise<void>
  deleteTodoFolder: (folderId: number) => Promise<void>
}

export interface IUserBaseAdapter {
  getUserInfo: (userId: string) => AsyncNullable<IUserInfo>
}

export interface IWordBaseAdapter {
  getMyUsedWords: (userId: string) => Promise<IUsedWord | null>
  getUsedWords: (word: string) => Promise<IWord | null>
}

export interface IReportBaseAdapter {
  sendReport: (params: IReport) => Promise<void>
}
