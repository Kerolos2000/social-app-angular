import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { ApiSuccessResponse } from '../../../../../core/models/api-response.interface';
import { User } from '../../../../../shared/models/user.interface';
import { Post } from '../../../posts/models/post.interface';
import { PostCommentResponse } from '../../models/comment.interface';
import { CommentService } from '../../services/comment.service';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { CommentSkeletonComponent } from '../comment-skeleton/comment-skeleton.component';

@Component({
  selector: 'app-post-comments',
  imports: [CommentItemComponent, CommentFormComponent, CommentSkeletonComponent],
  templateUrl: './post-comments.component.html',
})
export class PostCommentsComponent {
  private readonly commentService = inject(CommentService);

  post = input.required<Post>();
  user = input.required<User>();
  isInputVisible = input<boolean>(false);
  onViewAll = output<void>();

  showAllComments = signal(false);

  commentsQuery = injectQuery(() => ({
    queryKey: ['post-comments', this.post()._id],
    queryFn: () => this.commentService.getComments(this.post()._id),
    select: (res: ApiSuccessResponse<PostCommentResponse>) => res.data.comments,
    enabled: this.showAllComments(),
  }));

  topComment = computed(() => {
    return this.post().topComment;
  });

  allComments = computed(() => {
    return this.commentsQuery.data() || [];
  });

  toggleShowAll() {
    this.showAllComments.set(true);
    this.onViewAll.emit();
  }
}
