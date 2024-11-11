export const AUTH_RESTRICTED_ROUTES = [
  '/signup',
  '/signin',
  '/modal/auth_guard',
]

export const PROTECTED_ROUTES = [
  '/write',
  '/edit_profile',
  '/modal/send_message',
  '/modal/report_sentence',
  '/modal/report_comment',
  '/modal/update_password',
  '/modal/delete_comment',
  '/modal/delete_sentence',
]

export const ROUTES = {
  HOME: '/home',
  SETTINGS: '/settings',
  POST: (sentenceId: number) => `/sentence_page/${sentenceId}`,
  WRITE: '/write',
  EDIT_POST: (sentenceId: number) => `/write?sentence_id=${sentenceId}`,
  PROFILE: (userId: string, path?: string) =>
    `/profile/${userId}${path ? `/${path}` : ''}`,
  EDIT_PROFILE: '/edit_profile',
  MODAL: {
    AUTH: {
      SIGNIN: '/modal/signin',
      SIGNUP: '/modal/signup',
    },
    FOLLOWER: (userId: string) => `/modal/follower/${userId}`,
    FOLLOWING: (userId: string) => `/modal/following/${userId}`,
    REPORT_COMMENT: (commentId: number) => `/modal/report_comment/${commentId}`,
    REPORT_SENTENCE: (sentenceId: number) =>
      `/modal/report_sentence/${sentenceId}`,
    DELETE_COMMENT: (commentId: number, sentenceId: number) =>
      `/modal/delete_comment/${commentId}?sentence_id=${sentenceId}`,
    DELETE_SENTENCE: (sentenceId: number) =>
      `/modal/delete_sentence/${sentenceId}`,
    UPDATE_PASSWORD: '/modal/update_password',
    SUCCESS: '/modal/success',
    AUTH_GUARD: '/modal/auth_guard',
    SEND_MESSAGE: '/modal/send_message',
  },
}
