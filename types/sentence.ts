export interface ISentence {
  user_id: string
  content: string
  emotion_level: string
  user_name: string
  email: string
  avatar_url: string | null
}

export interface IFavoriteWord {
  word: string
  count: number
}
