import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { ApiSuccessResponse } from '../../../../../core/models/api-response.interface';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { ConfirmDialogComponent } from '../../../../../shared/components/business/confirm-dialog/confirm-dialog.component';
import { ImgFallbackDirective } from '../../../../../shared/directives/img-fallback.directive';
import { User } from '../../../../../shared/models/user.interface';
import { RelativeTimePipe } from '../../../../../shared/pipes/relative-time.pipe';
import {
  Comment,
  PostReplyResponse,
  Reply,
} from '../../models/comment.interface';
import { CommentService } from '../../services/comment.service';
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
    ConfirmDialogComponent,
    ButtonComponent,
  ],
  templateUrl: './comment-item.component.html',
})
export class CommentItemComponent {
  private readonly commentService = inject(CommentService);
  private readonly queryClient = inject(QueryClient);
  private readonly toastr = inject(ToastrService);

  comment = input.required<Comment | Reply>();
  user = input.required<User>();

  showReplies = signal(false);
  showReplyForm = signal(false);
  isEditing = signal(false);

  commentId = computed(() => this.comment()._id);
  postId = computed(() => this.comment().post);
  isLiked = computed(() => this.comment().likes?.includes(this.user()._id));

  isMyComment = computed(() => {
    return this.comment().commentCreator._id === this.user()._id;
  });

  repliesQuery = injectQuery(() => ({
    queryKey: ['comment-replies', this.commentId()],
    queryFn: () =>
      this.commentService.getReplies(this.postId(), this.commentId()),
    select: (res: ApiSuccessResponse<PostReplyResponse>) => res.data.replies,
    enabled: this.showReplies(),
  }));

  likeMutation = injectMutation(() => ({
    mutationFn: () =>
      this.commentService.likeComment(this.postId(), this.commentId()),
    onSuccess: () => {
      return Promise.all([
        this.queryClient.invalidateQueries({
          queryKey: ['post-comments', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['comment-replies', this.commentId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['feed'],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['profile-posts'],
        }),
      ]);
    },
  }));

  deleteMutation = injectMutation(() => ({
    mutationFn: () =>
      this.commentService.deleteComment(this.postId(), this.commentId()),
    onSuccess: () => {
      this.toastr.success('Comment deleted successfully');

      return Promise.all([
        this.queryClient.invalidateQueries({
          queryKey: ['post-comments', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['comment-replies'],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['feed'],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['profile-posts'],
        }),
      ]);
    },
  }));

  updateMutation = injectMutation(() => ({
    mutationFn: ({ content, image }: { content: string; image?: File }) =>
      this.commentService.updateComment(
        this.postId(),
        this.commentId(),
        content,
        image,
      ),
    onSuccess: () => {
      this.toastr.success('Comment updated successfully');
      this.isEditing.set(false);
      return Promise.all([
        this.queryClient.invalidateQueries({
          queryKey: ['post-comments', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['comment-replies', this.commentId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['feed'],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['profile-posts'],
        }),
      ]);
    },
  }));

  toggleReplies() {
    this.showReplies.update((v) => !v);
  }

  toggleReplyForm() {
    this.showReplyForm.update((v) => !v);
  }
}
