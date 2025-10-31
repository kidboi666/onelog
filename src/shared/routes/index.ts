export const AUTH_RESTRICTED_ROUTES: string[] = [];

export const PROTECTED_ROUTES = ["/post/edit", "/profile/edit"];

export const ROUTES = {
  HOME: "/",
  PROFILE: {
    VIEW: (userId: string, path?: string) =>
      `/profile/${userId}${path ? `/${path}` : ""}`,
    EDIT: "/profile/edit",
    SUMMARY: (userId: string) => `/profile/${userId}/summary`,
  },
  POST: {
    NEW: "/post/edit",
    VIEW: (postId: number) => `/post/${postId}`,
    EDIT: (postId: number) => `/post/edit?post_id=${postId}`,
  },
  MODAL: {
    COMMENT: {
      DELETE: (commentId: number, postId: number) => "/", // Deprecated - use DeleteCommentDialog
    },
    POST: {
      DELETE: (postId: number) => "/", // Deprecated - use DeletePostDialog
    },
  },
};
