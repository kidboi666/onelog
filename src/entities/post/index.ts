export type {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
  IUpdatePostFormActions,
  IUpdatePostFormStates,
} from "./api/dtos";
export { useCreatePost, useDeletePost, useUpdatePost } from "./api/mutates";
export { postQuery } from "./api/queries";
