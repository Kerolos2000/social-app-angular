import { Component, input } from '@angular/core';
import { ImgFallbackDirective } from '../../../../../../shared/directives/img-fallback.directive';
import { RelativeTimePipe } from '../../../../../../shared/pipes/relative-time.pipe';
import { Comment } from '../../../../models/post.interface';

@Component({
  selector: 'app-comment-item',
  imports: [RelativeTimePipe, ImgFallbackDirective],
  templateUrl: './comment-item.component.html',
})
export class CommentItemComponent {
  comment = input.required<Comment>();
}
