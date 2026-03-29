import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/constants/api';
import { ApiSuccessResponse } from '../../../../core/models/api-response.interface';
import { PostFeedResponse } from '../models/post.interface';
import { Privacy } from '../models/privacy.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);

  getFeed(only: Privacy, limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        API_ENDPOINTS.POSTS.FEED(only, limit),
      ),
    );
  }

  likePost(postId: string) {
    return lastValueFrom(this.http.put(API_ENDPOINTS.POSTS.LIKE(postId), {}));
  }

  bookmarkPost(postId: string) {
    return lastValueFrom(
      this.http.put(API_ENDPOINTS.POSTS.BOOKMARK(postId), {}),
    );
  }

  getBookmarks(limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        API_ENDPOINTS.USERS.BOOKMARKS(1, limit),
      ),
    );
  }

  deletePost(postId: string) {
    return lastValueFrom(this.http.delete(API_ENDPOINTS.POSTS.DELETE(postId)));
  }
}
