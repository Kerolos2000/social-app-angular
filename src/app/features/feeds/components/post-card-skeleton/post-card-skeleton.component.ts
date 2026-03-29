import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-post-card-skeleton',
  templateUrl: './post-card-skeleton.component.html',
})
export class PostCardSkeletonComponent {
  count = input<number>(3);
  items = computed(() => Array.from({ length: this.count() }));
}
