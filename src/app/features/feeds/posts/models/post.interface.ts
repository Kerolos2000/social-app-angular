import { User } from '../../../../shared/models/user.interface';
import { Privacy } from './privacy.interface';
import { Comment } from '../../comments/models/comment.interface';

export interface Post {
  _id: string;
  body: string;
  image?: string;
  user: User;
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  likesCount: number;
  sharesCount: number;
  isShare: boolean;
  bookmarked: boolean;
  sharedPost?: Post | null;
  id: string;
  privacy: Privacy;
  likes: string[];
}

export type PostFeedResponse = { posts: Post[] } | { bookmarks: Post[] };
