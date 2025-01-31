export enum Provider {
  SUPABASE = 'supabase',
  NEST = 'nest',
}

export enum AuthMethod {
  EMAIL = 'email',
  KAKAO = 'kakao',
}

export enum Access {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum PostType {
  ARTICLE = 'article',
  JOURNAL = 'journal',
}

// @TODO 원시값으로 변경
export enum EmotionLevel {
  '0%' = '0%',
  '25%' = '25%',
  '50%' = '50%',
  '75%' = '75%',
  '100%' = '100%',
}

export enum FolderColor {
  BLACK = 'black',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue',
  ORANGE = 'orange',
  RED = 'red',
  PURPLE = 'purple',
}

export enum Toast {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export enum ColorScheme {
  BLACK = 'black',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue',
  ORANGE = 'orange',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
