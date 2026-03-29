import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/constants/api';
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
        API_ENDPOINTS.POSTS.GET_COMMENTS(postId, page, limit),
      ),
    );
  }

  getReplies(postId: string, commentId: string) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostReplyResponse>>(
        API_ENDPOINTS.POSTS.GET_REPLIES(postId, commentId),
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
        API_ENDPOINTS.POSTS.CREATE_COMMENT(postId),
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
        API_ENDPOINTS.POSTS.CREATE_REPLY(postId, commentId),
        formData,
      ),
    );
  }
}
