export const QUERY_KEY = {
  AUTH: {
    SESSION: ['me', 'session'],
    INFO: ['me', 'info'],
  },

  USER: {
    INFO: (userId: string) => ['user', 'info', userId],
  },

  POST: {
    PUBLIC: ['all_post'],
    LIKED: (userId?: string | null, meId?: string | null) => ['post', 'liked', userId, meId],
    THAT_DAY: (startOfDay?: string | null, endOfDay?: string | null, authorId?: string | null) => [
      'post',
      startOfDay,
      endOfDay,
      authorId,
    ],
    POST_TYPE: (postType?: 'journal' | 'article', authorId?: string | null) => [
      'post',
      postType,
      authorId,
    ],
    DETAIL: (postId?: number) => ['post', postId],
    CHECK_LIKED: (postId?: number, meId?: string | null) => ['post', 'isLiked', postId, meId],

    COUNT: {
      LIKED: (userId: string) => ['count', 'post', userId],
      TOTAL: (userId: string) => ['count', 'allPost', userId],
      POST_TYPE: (userId: string, postType?: 'journal' | 'article') => [
        'count',
        'post',
        postType,
        userId,
      ],
    },
  },

  WORD: {
    USED: (authorId: string) => ['word', authorId],
    DETAIL: (word: string) => ['word', word],
  },

  GARDEN: (userId: string) => ['garden', userId],

  FOLLOW: {
    FOLLOWER: (userId?: string | null) => ['follower', userId],
    FOLLOWING: (userId?: string | null) => ['following', userId],

    COUNT: {
      FOLLOWER: (userId?: string) => ['count', 'follower', userId],
      FOLLOWING: (userId?: string) => ['count', 'following', userId],
    },
  },

  TODO: {
    IN_PROGRESS: ['todo', 'in_progress'],
    COMPLETED: ['todo', 'completed'],
    MAIN: ['todo_folder'],
    FOLDER: (folderId: number) => ['todo', folderId],
    INDEX: (folderId: number) => ['todo', 'index', folderId],
  },
}
