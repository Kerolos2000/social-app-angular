import { User } from '../../../shared/models/user.interface';
import { Privacy } from './privacy.interface';

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

export interface PostCommentResponse {
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  createdAt: string;
  post: string;
  image?: string;
  parentComment?: string | null;
  likes: string[];
  replies?: Reply[];
  repliesCount: number;
  id?: string;
  isReply?: boolean;
}

export interface Reply {
  _id: string;
  content: string;
  commentCreator: User;
  createdAt: string;
  image?: string;
  id?: string;
  isReply?: boolean;
  likes?: string[];
  likesCount?: number;
  parentComment?: string | null;
  post: string;
  repliesCount?: number;
  replies?: Reply[];
}

export interface PostReplyResponse {
  replies: Reply[];
}
