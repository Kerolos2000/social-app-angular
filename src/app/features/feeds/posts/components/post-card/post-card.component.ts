import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { ApiSuccessResponse } from '../../../../../core/models/api-response.interface';
import { User } from '../../../../../shared/models/user.interface';
import { PostCommentsComponent } from '../../../comments/components/post-comments/post-comments.component';
import { Post, PostResponse } from '../../models/post.interface';
import { PostService } from '../../services/post.service';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { PostContentComponent } from './components/post-content/post-content.component';
import { PostHeaderComponent } from './components/post-header/post-header.component';

@Component({
  selector: 'app-post-card',
  imports: [
    PostHeaderComponent,
    PostContentComponent,
    PostActionsComponent,
    PostCommentsComponent,
  ],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  post = input.required<Post>();
  user = input.required<User>();
  showComments = input<boolean>(false);

  postService = inject(PostService);
  queryClient = inject(QueryClient);
  toastr = inject(ToastrService);

  isEditing = signal(false);

  isCommentInputVisible = linkedSignal(() => this.showComments());

  isLiked = computed(() => {
    return this.post().likes?.includes(this.user()._id);
  });

  updateMutation = injectMutation(() => ({
    mutationFn: (newBody: string) =>
      this.postService.updatePost(this.post().id, newBody),
    onSuccess: (res: ApiSuccessResponse<PostResponse>) => {
      return Promise.all([
        this.queryClient.invalidateQueries({ queryKey: ['feed'] }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.post().id],
        }),
        this.isEditing.set(false),
        this.toastr.success(res.message),
      ]);
    },
  }));

  toggleCommentInput() {
    this.isCommentInputVisible.set(true);
  }

  saveEdit(newBody: string) {
    this.updateMutation.mutate(newBody);
  }
}
