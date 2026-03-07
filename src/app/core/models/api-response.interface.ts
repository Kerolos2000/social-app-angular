export interface ApiError {
  success: false;
  message: string;
  errors: string[];
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  meta?: {
    currentPage: number;
    limit: number;
    total: number;
    numberOfPages: number;
  };
}
