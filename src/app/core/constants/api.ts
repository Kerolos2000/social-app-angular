import { Privacy } from '../../features/feeds/posts/models/privacy.interface';
import { environment } from '../environments/environment';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: () => `${environment.BASE_URL}/users/signin`,
    REGISTER: () => `${environment.BASE_URL}/users/signup`,
  },
  USERS: {
    SUGGESTIONS: (limit: number = 5) =>
      `${environment.BASE_URL}/users/suggestions?limit=${limit}`,
    FOLLOW: (userId: string) =>
      `${environment.BASE_URL}/users/${userId}/follow`,
    BOOKMARKS: (page: number = 1, limit: number = 10) =>
      `${environment.BASE_URL}/users/bookmarks?page=${page}&limit=${limit}`,
  },
  POSTS: {
    FEED: (only: Privacy = 'following', limit: number = 10) =>
      `${environment.BASE_URL}/posts/feed?only=${only}&limit=${limit}`,
    LIKE: (postId: string) => `${environment.BASE_URL}/posts/${postId}/like`,
    BOOKMARK: (postId: string) =>
      `${environment.BASE_URL}/posts/${postId}/bookmark`,
    DELETE: (postId: string) => `${environment.BASE_URL}/posts/${postId}`,
    CREATE_COMMENT: (postId: string) =>
      `${environment.BASE_URL}/posts/${postId}/comments`,
    GET_COMMENTS: (postId: string, page: number = 1, limit: number = 10) =>
      `${environment.BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
    GET_REPLIES: (postId: string, commentId: string) =>
      `${environment.BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
    CREATE_REPLY: (postId: string, commentId: string) =>
      `${environment.BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
  },
};
