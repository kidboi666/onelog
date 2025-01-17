const origin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://some.domain'

export const FETCH_URL = {
  AUTH: {
    SIGN_IN: `${origin}/auth/signin`,
    SIGN_UP: `${origin}/auth/signup`,
    SIGN_OUT: `${origin}/auth/signout`,
    GET_SESSION: `${origin}/auth/session`,
  },
  USER: {
    GET_INFO: (id: string) => `${origin}/user/${id}`,
    UPDATE_USER: (id: string) => `${origin}/user/${id}`,
  },
}
