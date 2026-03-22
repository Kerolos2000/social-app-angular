import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ApiSuccessResponse } from '../../../../core/models/api-response.interface';
import { SuggestedFriendsResponse } from '../../../../features/feeds/models/suggested-friends.interface';
import { SuggestedFriendsService } from '../../../../features/feeds/services/suggested-friends.service';
import { SuggestedFriendCardSkeletonComponent } from './suggested-friend-card/suggested-friend-card-skeleton/suggested-friend-card-skeleton.component';
import { SuggestedFriendCardComponent } from './suggested-friend-card/suggested-friend-card.component';

@Component({
  selector: 'app-suggested-friends',
  imports: [SuggestedFriendCardComponent, SuggestedFriendCardSkeletonComponent],
  templateUrl: './suggested-friends.component.html',
})
export class SuggestedFriendsComponent {
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  query = injectQuery(() => ({
    queryKey: ['suggested-friends'],
    queryFn: () => this.suggestedFriendsService.getSuggestedFriends(),
    select: (res: ApiSuccessResponse<SuggestedFriendsResponse>) =>
      res.data.suggestions,
  }));
}
