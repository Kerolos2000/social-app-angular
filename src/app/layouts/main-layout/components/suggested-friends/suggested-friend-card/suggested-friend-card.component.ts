import { Component, Input } from '@angular/core';
import { ImgFallbackDirective } from '../../../../../shared/directives/img-fallback.directive';
import { SuggestedFriend } from '../../../models/suggested-friends.interface';

@Component({
  selector: 'app-suggested-friend-card',
  imports: [ImgFallbackDirective],
  templateUrl: './suggested-friend-card.component.html',
})
export class SuggestedFriendCardComponent {
  @Input({ required: true }) friend!: SuggestedFriend;
}
