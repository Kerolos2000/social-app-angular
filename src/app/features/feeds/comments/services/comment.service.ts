import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../core/environments/environment';
import { ApiSuccessResponse } from '../../../../core/models/api-response.interface';
import {
  Comment,
  PostCommentResponse,
  PostReplyResponse,
} from '../models/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly http = inject(HttpClient);

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

  createReply(postId: string, commentId: string, replyBody: string, image?: File) {
    const formData = new FormData();
    formData.append('content', replyBody);
    if (image) {
      formData.append('image', image);
    }
    return lastValueFrom(
      this.http.post(
        `${environment.BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
        formData,
      ),
    );
  }
}
