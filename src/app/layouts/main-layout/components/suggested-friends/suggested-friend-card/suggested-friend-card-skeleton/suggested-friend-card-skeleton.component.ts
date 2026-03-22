import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggested-friend-card-skeleton',
  templateUrl: './suggested-friend-card-skeleton.component.html',
})
export class SuggestedFriendCardSkeletonComponent {
  @Input() numberOfSkeletons: number = 5;

  items = Array.from({ length: this.numberOfSkeletons });
}
