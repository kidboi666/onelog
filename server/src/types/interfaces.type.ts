export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}

export interface JwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}
