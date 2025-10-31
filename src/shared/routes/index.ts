export const AUTH_RESTRICTED_ROUTES: string[] = [];

export const PROTECTED_ROUTES = ["/post/edit", "/profile/edit"];

export const ROUTES = {
  HOME: "/",
  PROFILE: {
    VIEW: (userId: string, path?: string) =>
      `/profile/${userId}${path ? `/${path}` : ""}`,
    EDIT: "/profile/edit",
    SUMMARY: (userId: string) => `/profile/${userId}/summary`,
  },
  ARTICLE: {
    NEW: "/article/edit",
    VIEW: (id: number) => `/article/${id}`,
    EDIT: (id: number) => `/article/edit?id=${id}`,
  },
};
