import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ApiSuccessResponse } from '../../../../../../core/models/api-response.interface';
import { ImgFallbackDirective } from '../../../../../../shared/directives/img-fallback.directive';
import { User } from '../../../../../../shared/models/user.interface';
import { RelativeTimePipe } from '../../../../../../shared/pipes/relative-time.pipe';
import {
  Comment,
  PostReplyResponse,
  Reply,
} from '../../../../models/post.interface';
import { PostService } from '../../../../services/post.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-comment-item',
  imports: [
    RelativeTimePipe,
    ImgFallbackDirective,
    CommentFormComponent,
    CommonModule,
  ],
  templateUrl: './comment-item.component.html',
})
export class CommentItemComponent {
  private readonly postService = inject(PostService);

  comment = input.required<Comment | Reply>();
  user = input.required<User>();

  showReplies = signal(false);
  showReplyForm = signal(false);

  repliesQuery = injectQuery(() => ({
    queryKey: ['comment-replies', this.comment()._id],
    queryFn: () =>
      this.postService.getReplies(this.comment().post, this.comment()._id),
    select: (res: ApiSuccessResponse<PostReplyResponse>) => res.data.replies,
    enabled: this.showReplies(),
  }));

  toggleReplies() {
    this.showReplies.update((v) => !v);
  }

  toggleReplyForm() {
    this.showReplyForm.update((v) => !v);
  }
}
