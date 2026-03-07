import { ApiSuccessResponse } from '../../../core/models/api-response.interface';

export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  username?: string;
  cover: string | null;
}

export interface AuthSuccessData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface AuthSuccessResponse extends ApiSuccessResponse<AuthSuccessData> {}
