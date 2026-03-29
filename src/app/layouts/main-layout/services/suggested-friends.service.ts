import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_ENDPOINTS } from '../../../core/constants/api';
import { ApiSuccessResponse } from '../../../core/models/api-response.interface';
import { SuggestedFriendsResponse } from '../models/suggested-friends.interface';

@Injectable({
  providedIn: 'root',
})
export class SuggestedFriendsService {
  private readonly http = inject(HttpClient);

  getSuggestedFriends(limit?: number) {
    return lastValueFrom(
      this.http.get<ApiSuccessResponse<SuggestedFriendsResponse>>(
        API_ENDPOINTS.USERS.SUGGESTIONS(limit),
      ),
    );
  }

  toggleFollowFriend(userId: string) {
    return lastValueFrom(
      this.http.put<ApiSuccessResponse<SuggestedFriendsResponse>>(
        API_ENDPOINTS.USERS.FOLLOW(userId),
        null,
      ),
    );
  }
}
