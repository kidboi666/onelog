import type { AuthError } from "@supabase/auth-js";
import type { StorageError } from "@supabase/storage-js";
import type { PostgrestError } from "@supabase/supabase-js";
import { APIError } from "@/shared/lib/errors/api-error";

type QueryResponse<T> = T extends any[] ? T : T | null;

export const handleError = (error: PostgrestError | null) => {
  if (error?.code && error?.message) {
    throw new APIError(error.code, error.message, error);
  }
};

const toCamelCase = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as unknown as T;
  }
  const result: Record<string, unknown> = {};

  Object.keys(obj).forEach((key) => {
    const camelCaseKey = key
      .split("_")
      .map((word, i) =>
        i === 0 ? word : word[0].toUpperCase() + word.slice(1),
      )
      .join("");

    const value = obj[key];
    result[camelCaseKey] = toCamelCase(value);
  });
  return result as T;
};

export const transformResponse = <T>(data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => {
      return typeof item === "object" ? toCamelCase(item) : item;
    }) as T;
  }
  if (typeof data === "object") {
    return toCamelCase(data as Record<string, any>) as T;
  }
  return data;
};

export const addUserFilter = (
  query: any,
  authorId?: string,
  meId?: string | null,
) => {
  if (meId) {
    query = query.eq("like.user_id", meId);
  }
  if (authorId) {
    query = query.eq("user_id", authorId);
  }
  return query;
};

export const processQuery = async <T>(
  query: any,
): Promise<QueryResponse<T>> => {
  const { data, error } = await query;
  handleError(error);

  const emptyResponse = Array.isArray(data) ? [] : null;
  return transformResponse(data ?? emptyResponse) as QueryResponse<T>;
};

export const processCountQuery = async (query: any): Promise<number> => {
  const { count, error } = await query;
  handleError(error);

  return count ?? 0;
};

// 스토리지 예외 처리
export const handleStorageError = (error: StorageError | null) => {
  if (error?.message) {
    throw new APIError(500, error.message, error);
  }
};

// auth 예외 처리
export const handleAuthError = (error: AuthError | null) => {
  if (error?.status && error?.code) {
    throw new APIError(error.status, error.code, error);
  }
};

// 이미지 파일 주소화 처리 헬퍼 함수
export const processImageUrlPath = (imageUrl: string): string => {
  const splitPath = imageUrl.split("/");
  const email = splitPath[splitPath.length - 2];
  const fileName = splitPath[splitPath.length - 1];
  return `${email}/${fileName}`;
};
