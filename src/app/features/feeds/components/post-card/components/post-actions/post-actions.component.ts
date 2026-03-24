import { Component, inject, input, output } from '@angular/core';
import {
  injectMutation,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-actions',
  templateUrl: './post-actions.component.html',
})
export class PostActionsComponent {
  private readonly postService = inject(PostService);
  private readonly queryClient = injectQueryClient();

  postId = input.required<string>();
  isLiked = input<boolean>(false);
  likesCount = input<number>(0);
  commentsCount = input<number>(0);
  onCommentClick = output<void>();

  likeMutation = injectMutation<any, Error, string>(() => ({
    mutationFn: (id: string) => this.postService.likePost(id),
    onSuccess: () => {
      return this.queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  }));

  onLike() {
    this.likeMutation.mutate(this.postId());
  }
}
