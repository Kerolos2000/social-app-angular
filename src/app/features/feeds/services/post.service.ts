import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../core/environments/environment';
import { ApiSuccessResponse } from '../../../core/models/api-response.interface';
import {
  PostCommentResponse,
  PostFeedResponse,
  PostReplyResponse,
} from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);

  getFeed(only: string = 'following', limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        `${environment.BASE_URL}/posts/feed?only=${only}&limit=${limit}`,
      ),
    );
  }

  getComments(postId: string, page: number = 1, limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostCommentResponse>>(
        `${environment.BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
      ),
    );
  }

  getReplies(postId: string, commentId: string) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostReplyResponse>>(
        `${environment.BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
      ),
    );
  }

  likePost(postId: string) {
    return lastValueFrom(
      this.http.put(`${environment.BASE_URL}/posts/${postId}/like`, {}),
    );
  }

  bookmarkPost(postId: string) {
    return lastValueFrom(
      this.http.get(`${environment.BASE_URL}/posts/${postId}/bookmark`),
    );
  }

  getBookmarks(limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        `${environment.BASE_URL}/users/bookmarks?page=1&limit=${limit}`,
      ),
    );
  }

  createComment(postId: string, commentBody: string, image?: File) {
    const formData = new FormData();
    formData.append('content', commentBody);
    if (image) {
      formData.append('image', image);
    }
    return lastValueFrom(
      this.http.post<ApiSuccessResponse<Comment>>(
        `${environment.BASE_URL}/posts/${postId}/comments`,
        formData,
      ),
    );
  }

  createReply(postId: string, commentId: string, replyBody: string) {
    return lastValueFrom(
      this.http.post(
        `${environment.BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
        { content: replyBody },
      ),
    );
  }

  deletePost(postId: string) {
    return lastValueFrom(
      this.http.delete(`${environment.BASE_URL}/posts/${postId}`),
    );
  }
}
