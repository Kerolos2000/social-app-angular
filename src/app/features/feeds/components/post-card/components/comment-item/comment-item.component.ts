import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
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
import { CommentSkeletonComponent } from '../comment-skeleton/comment-skeleton.component';

@Component({
  selector: 'app-comment-item',
  imports: [
    RelativeTimePipe,
    ImgFallbackDirective,
    CommentFormComponent,
    CommentSkeletonComponent,
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

  commentId = computed(() => this.comment()._id);
  postId = computed(() => this.comment().post);

  repliesQuery = injectQuery(() => ({
    queryKey: ['comment-replies', this.commentId()],
    queryFn: () => this.postService.getReplies(this.postId(), this.commentId()),
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
