import { Component, Input } from '@angular/core';
import { SuggestedFriend } from '../../../../../features/feeds/models/suggested-friends.interface';
import { ImgFallbackDirective } from '../../../../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-suggested-friend-card',
  imports: [ImgFallbackDirective],
  templateUrl: './suggested-friend-card.component.html',
})
export class SuggestedFriendCardComponent {
  @Input({ required: true }) friend!: SuggestedFriend;
}
