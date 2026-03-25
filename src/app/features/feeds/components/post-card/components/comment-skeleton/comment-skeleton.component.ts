import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-skeleton',
  imports: [],
  templateUrl: './comment-skeleton.component.html',
})
export class CommentSkeletonComponent {
  @Input() count: number = 3;
  @Input() isReply: boolean = false;

  get items() {
    return Array.from({ length: this.count });
  }
}
