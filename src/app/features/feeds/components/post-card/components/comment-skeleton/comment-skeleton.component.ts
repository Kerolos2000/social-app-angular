import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-comment-skeleton',
  imports: [],
  templateUrl: './comment-skeleton.component.html',
})
export class CommentSkeletonComponent {
  count = input<number>(3);
  isReply = input<boolean>(false);

  items = computed(() => Array.from({ length: this.count() }));
}
