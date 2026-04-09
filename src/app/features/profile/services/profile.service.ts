import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/constants/api';
import { ApiSuccessResponse } from '../../../core/models/api-response.interface';
import { ProfileResponse } from '../models/profile.interface';
import { PostFeedResponse } from '../../feeds/posts/models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  getUserProfile(userId: string) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<ProfileResponse>>(
        API_ENDPOINTS.USERS.GET_PROFILE(userId),
      ),
    );
  }

  getUserPosts(userId: string, limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        API_ENDPOINTS.USERS.PROFILE_POSTS(userId, limit),
      ),
    );
  }

  getUserBookmarks(limit: number = 10) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<PostFeedResponse>>(
        API_ENDPOINTS.USERS.BOOKMARKS(1, limit),
      ),
    );
  }

  uploadProfilePhoto(photo: File) {
    const formData = new FormData();
    formData.append('photo', photo);
    return lastValueFrom(
      this.http.put<ApiSuccessResponse<any>>(
        API_ENDPOINTS.USERS.UPLOAD_PHOTO(),
        formData,
      ),
    );
  }
}
