// Auth-related routes that should redirect to home if user is already logged in
export const AUTH_RESTRICTED_ROUTES: string[] = [];

// Routes that require authentication
export const PROTECTED_ROUTES = ["/post/edit", "/profile/edit"];

export const ROUTES = {
  HOME: "/",
  SETTINGS: "/settings",
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
  TODO: {
    TODO: "/todo",
    MAIN: "/todo/main",
    VIEW: {
      FOLDER: (folderId: number, color: string) =>
        `/todo/custom_task/${folderId}?color=${color}`,
      DETAIL: (
        todoId: number,
        folderId: number,
        color: string,
        orderFrom: "main" | "folder",
      ) =>
        `/todo/detail/${todoId}?folder_id=${folderId}&color=${color}&order_from=${orderFrom}`,
    },
  },
  // DEPRECATED: Modal routes are being migrated to Dialog components
  // Use Dialog components from features/ instead of routing
  // Example: import { SignInDialog } from '@/features/auth/ui'
  MODAL: {
    AUTH: {
      SIGN_IN: "/", // Deprecated - use SignInDialog component
      SIGN_UP: "/", // Deprecated - use SignUpDialog component
      GUARD: "/", // Deprecated - use AuthGuardDialog component
    },
    COMMENT: {
      DELETE: (commentId: number, postId: number) => "/", // Deprecated - use DeleteCommentDialog
    },
    POST: {
      DELETE: (postId: number) => "/", // Deprecated - use DeletePostDialog
    },
    FOLLOW: {
      FOLLOWER: (userId: string) => "/", // Deprecated - use FollowerListDialog
      FOLLOWING: (userId: string) => "/", // Deprecated - use FollowingListDialog
    },
    REPORT: {
      COMMENT: (commentId: number) => "/",
      POST: (postId: number) => "/",
    },
    TODO: {
      POST: "/",
      DELETE: () => "/",
      DELETE_FOLDER: () => "/",
      EDIT: () => "/",
    },
    UPDATE_PASSWORD: "/",
    SUCCESS: "/", // Deprecated - use SuccessDialog component
    SEND_MESSAGE: "/",
  },
};
