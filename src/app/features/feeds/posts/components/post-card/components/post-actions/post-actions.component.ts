import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ROUTES } from '../../../../../../../core/constants/routes';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-actions',
  imports: [RouterLink],
  templateUrl: './post-actions.component.html',
})
export class PostActionsComponent {
  ROUTES = ROUTES;
  private readonly postService = inject(PostService);
  private readonly queryClient = inject(QueryClient);

  postId = input.required<string>();
  isLiked = input<boolean>(false);
  likesCount = input<number>(0);
  commentsCount = input<number>(0);
  onCommentClick = output<void>();

  likeMutation = injectMutation<any, Error, string>(() => ({
    mutationFn: (id: string) => this.postService.likePost(id),
    onSuccess: () => {
      return Promise.all([
        this.queryClient.invalidateQueries({ queryKey: ['feed'] }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.postId()],
        }),
      ]);
    },
  }));

  onLike() {
    this.likeMutation.mutate(this.postId());
  }
}
