import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-card-skeleton',
  templateUrl: './post-card-skeleton.component.html',
})
export class PostCardSkeletonComponent {
  @Input() count: number = 3;

  get items() {
    return Array.from({ length: this.count });
  }
}
