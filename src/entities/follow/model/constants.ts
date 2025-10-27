export const FOLLOW_SUPABASE_QUERY = {
  GET_FOLLOWERS: "*, user_info!follow_follower_user_id_fkey(*)",
  GET_FOLLOWINGS: "*, user_info!follow_followed_user_id_fkey(*)",
  GET_FOLLOWERS_COUNT: {
    query: "followed_user_id",
    options: { count: "exact", head: true },
  },
  GET_FOLLOWINGS_COUNT: {
    query: "follower_user_id",
    options: { count: "exact", head: true },
  },
} as const;

export const FOLLOW_QUERY_KEY = {
  FOLLOWER: (userId?: string | null) => ["follower", userId],
  FOLLOWING: (userId?: string | null) => ["following", userId],

  COUNT: {
    FOLLOWER: (userId?: string) => ["count", "follower", userId],
    FOLLOWING: (userId?: string) => ["count", "following", userId],
  },
};

export const FOLLOW_TOAST_MESSAGE = {
  SEND: {
    SUCCESS: "팔로우 신청에 성공했습니다.",
    EXCEPTION: "팔로우 신청에 실패했습니다.",
  },
  CANCEL: {
    SUCCESS: "팔로우 취소에 성공했습니다.",
    EXCEPTION: "팔로우 취소에 실패했습니다.",
  },
};
