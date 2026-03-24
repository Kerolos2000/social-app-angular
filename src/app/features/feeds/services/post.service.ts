import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../core/environments/environment';
import { ApiSuccessResponse } from '../../../core/models/api-response.interface';
import {
  PostCommentResponse,
  PostFeedResponse,
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

  createComment(postId: string, commentBody: string) {
    return lastValueFrom(
      this.http.post<ApiSuccessResponse<Comment>>(
        `${environment.BASE_URL}/posts/${postId}/comments`,
        { content: commentBody },
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
