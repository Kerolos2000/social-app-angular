import { User } from '../../../shared/models/user.interface';
import { ApiSuccessResponse } from '../../models/api-response.interface';

export interface AuthSuccessData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}

export interface AuthSuccessResponse extends ApiSuccessResponse<AuthSuccessData> {}
