import { User } from '../../../shared/models/user.interface';

export interface AuthSuccessData {
  token: string;
  tokenType: string;
  expiresIn: string;
  user: User;
}
