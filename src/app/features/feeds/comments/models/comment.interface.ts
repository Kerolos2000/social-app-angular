import { User } from '../../../../shared/models/user.interface';

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

export interface PostCommentResponse {
  comments: Comment[];
}

export interface PostReplyResponse {
  replies: Reply[];
}
