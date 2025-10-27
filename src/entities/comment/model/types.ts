export interface IComment {
  userInfo: {
    userName: string;
    avatarUrl: string;
    email: string;
    aboutMe: string;
  };
  comment: number | null;
  commentId: number | null;
  content: string;
  createdAt: string;
  id: number;
  postId: number;
  userId: string;
}
