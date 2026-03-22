import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../core/environments/environment';
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
        `${environment.BASE_URL}/users/suggestions?limit=${limit ?? 5}`,
      ),
    );
  }
}
