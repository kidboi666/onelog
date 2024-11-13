export const authRestrictedRoutes = [
  '/modal/signup',
  '/modal/signin',
  '/modal/auth_guard',
]

export const protectedRoutes = [
  '/post/edit',
  '/profile/edit',
  '/modal/send_message',
  '/modal/report_post',
  '/modal/report_comment',
  '/modal/update_password',
  '/modal/delete_comment',
  '/modal/delete_post',
]

export const routes = {
  home: '/',
  settings: '/settings',
  profile: {
    view: (userId: string, path?: string) =>
      `/profile/view/${userId}${path ? `/${path}` : ''}`,
    edit: '/profile/edit',
  },
  post: {
    new: '/post/edit',
    view: (postId: number) => `/post/view/${postId}`,
    edit: (postId: number) => `/post/edit?post_id=${postId}`,
  },
  todo: {
    view: (menu: string = 'main') => `/todo/${menu}`,
  },
  modal: {
    auth: {
      signin: '/modal/signin',
      signup: '/modal/signup',
      guard: '/modal/auth_guard',
    },
    delete: {
      comment: (commentId: number, postId: number) =>
        `/modal/delete_comment/${commentId}?post_id=${postId}`,
      post: (postId: number) => `/modal/delete_post/${postId}`,
    },
    follow: {
      follower: (userId: string) => `/modal/follower/${userId}`,
      following: (userId: string) => `/modal/following/${userId}`,
    },
    report: {
      comment: (commentId: number) => `/modal/report_comment/${commentId}`,
      post: (postId: number) => `/modal/report_post/${postId}`,
    },
    todo: {
      post: '/modal/add_todo_folder',
      delete: (todoId: string, folderId: string) =>
        `/modal/delete_todo/${todoId}?folder_id=${folderId}`,
      deleteFolder: (folderId?: number) =>
        `/modal/delete_todo_folder/${folderId}`,
      edit: (folderId?: number) => `/modal/edit_todo_folder/${folderId}`,
    },
    updatePassword: '/modal/update_password',
    success: '/modal/success',
    sendMessage: '/modal/send_message',
  },
}
