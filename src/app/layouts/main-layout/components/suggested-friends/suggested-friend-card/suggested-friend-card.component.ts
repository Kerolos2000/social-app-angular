import { Component, inject, input } from '@angular/core';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { ImgFallbackDirective } from '../../../../../shared/directives/img-fallback.directive';
import { SuggestedFriend } from '../../../models/suggested-friends.interface';
import { SuggestedFriendsService } from '../../../services/suggested-friends.service';

@Component({
  selector: 'app-suggested-friend-card',
  imports: [ImgFallbackDirective, ButtonComponent],
  templateUrl: './suggested-friend-card.component.html',
})
export class SuggestedFriendCardComponent {
  friend = input.required<SuggestedFriend>();

  private readonly suggestedFriendsService = inject(SuggestedFriendsService);
  private readonly queryClient = inject(QueryClient);

  mutation = injectMutation(() => ({
    mutationFn: (userId: string) =>
      this.suggestedFriendsService.toggleFollowFriend(userId),
    onSuccess: () => {
      return this.queryClient.invalidateQueries({
        queryKey: ['suggested-friends'],
      });
    },
  }));
}
