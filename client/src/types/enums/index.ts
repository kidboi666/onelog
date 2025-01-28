export enum Provider {
  SUPABASE = 'supabase',
  NEST = 'nest',
}

export enum AuthProvider {
  LOCAL = 'local',
  KAKAO = 'kakao',
}

export enum AccessType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum PostType {
  ARTICLE = 'article',
  JOURNAL = 'journal',
}

export enum EmotionLevel {
  '0%' = '0%',
  '25%' = '25%',
  '50%' = '50%',
  '75%' = '75%',
  '100%' = '100%',
}

export enum TodoFolderColorType {
  BLACK = 'black',
  GREEN = 'green',
  YELLOW = 'yellow',
  BLUE = 'blue',
  ORANGE = 'orange',
  RED = 'red',
  PURPLE = 'purple',
}

export enum ToastType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
}
