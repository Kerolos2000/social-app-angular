import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { User } from '../../../../../shared/models/user.interface';
import { Post } from '../../models/post.interface';
import { PostActionsComponent } from './components/post-actions/post-actions.component';
import { PostCommentsComponent } from '../../../comments/components/post-comments/post-comments.component';
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

  isCommentInputVisible = linkedSignal(() => this.showComments());

  isLiked = computed(() => {
    return this.post().likes?.includes(this.user()._id);
  });

  toggleCommentInput() {
    this.isCommentInputVisible.set(true);
  }
}
