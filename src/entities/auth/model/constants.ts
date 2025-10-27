export const AUTH_QUERY_KEY = {
  SESSION: ["me", "session"],
  INFO: ["me", "info"],
};

export const AUTH_TOAST_MESSAGE = {
  AUTH: {
    SIGN_IN: {
      SUCCESS: "로그인에 성공했습니다.",
      EXCEPTION: "로그인에 실패했습니다.",
      MESSAGE: "환영합니다.",
    },
    SIGN_UP: {
      SUCCESS: "회원가입에 성공했습니다.",
      EXCEPTION: "회원가입에 실패했습니다.",
      MESSAGE: "환영합니다",
    },
    SIGN_OUT: {
      SUCCESS: "로그아웃에 성공했습니다.",
      EXCEPTION: "로그아웃에 실패했습니다.",
    },
  },
  OAUTH: {
    SIGN_IN: {
      SUCCESS: "소셜 로그인에 성공했습니다.",
      EXCEPTION: "소셜 로그인에 실패했습니다.",
      MESSAGE: "환영합니다.",
    },
    SIGN_UP: {
      SUCCESS: "소셜 회원가입에 성공했습니다.",
      EXCEPTION: "소셜 회원가입에 실패했습니다.",
      MESSAGE: "환영합니다",
    },
  },
  USER_INFO: {
    EDIT: {
      SUCCESS: "정보 수정에 성공했습니다.",
      EXCEPTION: "정보 수정에 실패했습니다.",
    },
    UPLOAD_AVATAR: {
      EXCEPTION: "이미지 변경중 문제가 발생했습니다.",
      OVER_SIZE: "이미지 파일 크기는 5MB 이하만 가능합니다.",
      WRONG_TYPE: "이미지 파일만 업로드 가능합니다.",
    },
  },
};
