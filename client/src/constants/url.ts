export const FETCH_URL = {
  AUTH: {
    SIGN_IN: `/auth/signin`,
    SIGN_UP: `/auth/signup`,
    SIGN_OUT: `/auth/signout`,
    GET_SESSION: `/auth/session`,
  },
  USER: {
    GET_INFO: (id: string) => `/user/${id}`,
    UPDATE_USER: (id: string) => `/user/${id}`,
  },
  TODO: {
    GET_BY_COMPLETION: '/todos',
    GET_BY_FOLDER_ID: (id: number) => `/todos/${id}`,
  },
  TODO_FOLDER: {
    GET_ALL: '/todo_folders',
  },
  POST: {
    GET_ALL: '/posts',
    GET_POST: (id: number) => `/posts/${id}`,
  },
}
