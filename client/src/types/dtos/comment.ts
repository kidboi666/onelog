export interface ICreateComment {
  content: string
  postId: number
  userId: string
  commentId: number | null
}

export interface IDeleteComment {
  postId: number
  commentId: number
}

export interface IUpdateComment {
  content: string
  postId: number
  commentId: number | null
}
