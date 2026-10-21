export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiResponseNoData {
  message: string;
}
