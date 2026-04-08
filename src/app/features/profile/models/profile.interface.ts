import { User } from '../../../shared/models/user.interface';

export interface UserProfile extends User {
  dateOfBirth: string;
  gender: 'male' | 'female';
  createdAt: string;
  followers?: string[];
  following?: string[];
}

export interface ProfileResponse {
  user: UserProfile;
}
