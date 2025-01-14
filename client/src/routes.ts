export const AUTH_RESTRICTED_ROUTES = ['/modal/signup', '/modal/signin', '/modal/auth_guard']

export const PROTECTED_ROUTES = [
  '/post/edit',
  '/profile/edit',
  '/modal/send_message',
  '/modal/report_post',
  '/modal/report_comment',
  '/modal/update_password',
  '/modal/delete_comment',
  '/modal/delete_post',
]

export const ROUTES = {
  HOME: '/',
  SETTINGS: '/settings',
  PROFILE: {
    VIEW: (userId: string, path?: string) => `/profile/view/${userId}${path ? `/${path}` : ''}`,
    EDIT: '/profile/edit',
  },
  POST: {
    NEW: '/post/edit',
    VIEW: (postId: number) => `/post/view/${postId}`,
    EDIT: (postId: number) => `/post/edit?post_id=${postId}`,
  },
  TODO: {
    TODO: '/todo',
    MAIN: '/todo/main',
    VIEW: {
      FOLDER: (folderId: number, color: string) => `/todo/custom_task/${folderId}?color=${color}`,
      DETAIL: (todoId: number, folderId: number, color: string, orderFrom: 'main' | 'folder') =>
        `/todo/detail/${todoId}?folder_id=${folderId}&color=${color}&order_from=${orderFrom}`,
    },
  },
  MODAL: {
    AUTH: {
      SIGN_IN: '/modal/signin',
      SIGN_UP: '/modal/signup',
      GUARD: '/modal/auth_guard',
    },
    DELETE: {
      COMMENT: (commentId: number, postId: number) =>
        `/modal/delete_comment/${commentId}?post_id=${postId}`,
      POST: (postId: number) => `/modal/delete_post/${postId}`,
    },
    FOLLOW: {
      FOLLOWER: (userId: string) => `/modal/follower/${userId}`,
      FOLLOWING: (userId: string) => `/modal/following/${userId}`,
    },
    REPORT: {
      COMMENT: (commentId: number) => `/modal/report_comment/${commentId}`,
      POST: (postId: number) => `/modal/report_post/${postId}`,
    },
    TODO: {
      POST: '/modal/add_todo_folder',
      DELETE: (todoId: string, folderId: string, color: string, orderFrom: 'main' | 'folder') =>
        `/modal/delete_todo/${todoId}?folder_id=${folderId}&color=${color}&order_from=${orderFrom}`,
      DELETE_FOLDER: (folderId?: number) => `/modal/delete_todo_folder/${folderId}`,
      EDIT: (folderId?: number) => `/modal/edit_todo_folder/${folderId}`,
    },
    UPDATE_PASSWORD: '/modal/update_password',
    SUCCESS: '/modal/success',
    SEND_MESSAGE: '/modal/send_message',
  },
}
