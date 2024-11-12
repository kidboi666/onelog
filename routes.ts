export const authRestrictedRoutes = ['/signup', '/signin', '/modal/auth_guard']

export const protectedRoutes = [
  '/write',
  '/edit_profile',
  '/modal/send_message',
  '/modal/report_sentence',
  '/modal/report_comment',
  '/modal/update_password',
  '/modal/delete_comment',
  '/modal/delete_sentence',
]

export const routes = {
  home: '/home',
  settings: '/settings',
  profile: {
    view: (userId: string, path?: string) =>
      `/profile/${userId}${path ? `/${path}` : ''}`,
    edit: '/edit_profile',
  },
  post: {
    new: '/write',
    view: (sentenceId: number) => `/sentence_page/${sentenceId}`,
    edit: (sentenceId: number) => `/write?sentence_id=${sentenceId}`,
  },
  modal: {
    auth: {
      signin: '/modal/signin',
      signup: '/modal/signup',
      guard: '/modal/auth_guard',
    },
    delete: {
      comment: (commentId: number, sentenceId: number) =>
        `/modal/delete_comment/${commentId}?sentence_id=${sentenceId}`,
      sentence: (sentenceId: number) => `/modal/delete_sentence/${sentenceId}`,
    },
    follow: {
      follower: (userId: string) => `/modal/follower/${userId}`,
      following: (userId: string) => `/modal/following/${userId}`,
    },
    report: {
      comment: (commentId: number) => `/modal/report_comment/${commentId}`,
      sentence: (sentenceId: number) => `/modal/report_sentence/${sentenceId}`,
    },
    updatePassword: '/modal/update_password',
    success: '/modal/success',
    sendMessage: '/modal/send_message',
  },
}
