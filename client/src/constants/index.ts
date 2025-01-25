export const TOAST_MESSAGE = {
  AUTH: {
    SIGN_IN: {
      SUCCESS: '로그인에 성공했습니다.',
      EXCEPTION: '로그인에 실패했습니다.',
      MESSAGE: '환영합니다.',
    },
    SIGN_UP: {
      SUCCESS: '회원가입에 성공했습니다.',
      EXCEPTION: '회원가입에 실패했습니다.',
      MESSAGE: '환영합니다',
    },
    SIGN_OUT: {
      SUCCESS: '로그아웃에 성공했습니다.',
      EXCEPTION: '로그아웃에 실패했습니다.',
    },
  },
  OAUTH: {
    SIGN_IN: {
      SUCCESS: '소셜 로그인에 성공했습니다.',
      EXCEPTION: '소셜 로그인에 실패했습니다.',
      MESSAGE: '환영합니다.',
    },
    SIGN_UP: {
      SUCCESS: '소셜 회원가입에 성공했습니다.',
      EXCEPTION: '소셜 회원가입에 실패했습니다.',
      MESSAGE: '환영합니다',
    },
  },
  USER_INFO: {
    EDIT: {
      SUCCESS: '정보 수정에 성공했습니다.',
      EXCEPTION: '정보 수정에 실패했습니다.',
    },
    UPLOAD_AVATAR: {
      EXCEPTION: '이미지 변경중 문제가 발생했습니다.',
    },
  },
  COMMENT: {
    DELETE: {
      SUCCESS: '댓글 삭제에 성공했습니다.',
      EXCEPTION: '댓글 삭제에 실패했습니다.',
    },
    POST: {
      SUCCESS: '댓글 생성에 성공했습니다.',
      EXCEPTION: '댓글 생성에 실패했습니다.',
    },
    UPDATE: {
      SUCCESS: '댓글 수정에 성공했습니다.',
      EXCEPTION: '댓글 수정에 실패했습니다.',
    },
  },
  FOLLOW: {
    SEND: {
      SUCCESS: '팔로우 신청에 성공했습니다.',
      EXCEPTION: '팔로우 신청에 실패했습니다.',
    },
    CANCEL: {
      SUCCESS: '팔로우 취소에 성공했습니다.',
      EXCEPTION: '팔로우 취소에 실패했습니다.',
    },
  },
  POST: {
    POST: {
      SUCCESS: '게시물 업로드에 성공했습니다.',
      EXCEPTION: '게시물 업로드에 실패했습니다.',
    },
    UPDATE: {
      SUCCESS: '게시물 수정에 성공했습니다.',
      EXCEPTION: '게시물 업로드에 실패했습니다.',
    },
    DELETE: {
      SUCCESS: '게시물 삭제에 성공했습니다.',
      EXCEPTION: '게시물 삭제에 실패했습니다.',
    },
  },
  LIKE: {
    SEND: {
      SUCCESS: '좋아요에 성공했습니다.',
      EXCEPTION: '좋아요에 실패했습니다.',
    },
    CANCEL: {
      SUCCESS: '좋아요 취소에 성공했습니다.',
      EXCEPTION: '좋아요 취소에 실패했습니다.',
    },
  },
  REPORT: {
    POST: {
      SUCCESS: '게시물 신고에 성공했습니다.',
      EXCEPTION: '게시물 신고에 실패했습니다.',
    },
    COMMENT: {
      SUCCESS: '댓글 신고에 성공했습니다.',
      EXCEPTION: '댓글 신고에 실패했습니다.',
    },
  },
  TODO: {
    POST: {
      SUCCESS: '할일 생성에 성공했습니다.',
      EXCEPTION: '할일 생성에 실패했습니다.',
    },
    UPDATE: {
      SUCCESS: '할일 수정에 성공했습니다.',
      EXCEPTION: '할일 수정에 실패했습니다.',
    },
    DELETE: {
      SUCCESS: '할일 삭제에 성공했습니다.',
      EXCEPTION: '할일 삭제에 실패했습니다.',
    },
  },
  TODO_FOLDER: {
    POST: {
      SUCCESS: '할일 폴더 생성에 성공했습니다.',
      EXCEPTION: '할일 폴더 생성에 실패했습니다.',
    },
    DELETE: {
      SUCCESS: '할일 폴더 삭제에 성공했습니다.',
      EXCEPTION: '할일 폴더 삭제에 실패했습니다.',
    },
    UPDATE: {
      SUCCESS: '할일 폴더 수정에 성공했습니다.',
      EXCEPTION: '할일 폴더 수정에 실패했습니다.',
    },
  },
  SHARE: {
    CLIPBOARD: '주소가 복사되었습니다.',
  },
}
export const FETCH_URL = {
  AUTH: {
    SIGN_IN: `/auth/signin`,
    SIGN_UP: `/auth/signup`,
    SIGN_OUT: `/auth/signout`,
    GET_SESSION: `/auth/session`,
    GET_USER_INFO: `/auth/info`,
  },
  USER: {
    GET_USER_INFO: (id: string) => `/user/${id}`,
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

export const SUPABASE_QUERY = {
  GET_POSTS_WITH_AUTHOR_INFO:
    '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)',
  GET_LIKED_POSTS_WITH_AUTHOR_INFO:
    '*, post!like_post_id_fkey(*, comment_count:comment(count), liked_count:like(count), user_info(user_name, avatar_url, email, about_me))',
  GET_POST_DETAIL_WITH_AUTHOR_INFO_AND_COMMENTS:
    '*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), comments:comment(*, user_info(email, user_name, avatar_url, about_me)), user_info(email, user_name, avatar_url, about_me)',
}

export const PAGINATION = {
  LIMIT: 4,
}
