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
  id: number
  postId: number
  content: string
}
