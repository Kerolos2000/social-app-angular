import { Component, inject, OnInit } from '@angular/core';
import { SuggestedFriend } from '../../../../features/feeds/models/suggested-friends.interface';
import { SuggestedFriendsService } from '../../../../features/feeds/services/suggested-friends.service';
import { ImgFallbackDirective } from '../../../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-suggested-friends',
  imports: [ImgFallbackDirective],
  templateUrl: './suggested-friends.component.html',
})
export class SuggestedFriendsComponent implements OnInit {
  private readonly suggestedFriendsService = inject(SuggestedFriendsService);

  suggestedFriends: SuggestedFriend[] = [];

  getSuggestedFriends() {
    this.suggestedFriendsService.getSuggestedFriends().subscribe({
      next: (res) => {
        this.suggestedFriends = res.data.suggestions;
      },
    });
  }

  ngOnInit(): void {
    this.getSuggestedFriends();
  }
}
