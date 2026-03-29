import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-suggested-friend-card-skeleton',
  templateUrl: './suggested-friend-card-skeleton.component.html',
})
export class SuggestedFriendCardSkeletonComponent {
  numberOfSkeletons = input<number>(5);

  items = computed(() => Array.from({ length: this.numberOfSkeletons() }));
}
