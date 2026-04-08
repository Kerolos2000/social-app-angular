import { Component, input, output } from '@angular/core';
import { PostCardSkeletonComponent } from '../../feeds/posts/components/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../../feeds/posts/components/post-card/post-card.component';
import { EmptyStateComponent } from '../../../shared/components/business/empty-state/empty-state.component';
import { Post } from '../../feeds/posts/models/post.interface';
import { User } from '../../../shared/models/user.interface';

@Component({
  selector: 'app-profile-feed',
  standalone: true,
  imports: [PostCardSkeletonComponent, PostCardComponent, EmptyStateComponent],
  templateUrl: './profile-feed.component.html',
})
export class ProfileFeedComponent {
  posts = input<Post[]>([]);
  isLoading = input<boolean>(false);
  activeTab = input<'posts' | 'bookmarks'>('posts');
  isOwnProfile = input<boolean>(false);
  currentUser = input<User | null>(null);
  activeTabChange = output<'posts' | 'bookmarks'>();
}
