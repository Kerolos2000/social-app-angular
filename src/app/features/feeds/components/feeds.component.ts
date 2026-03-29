import { Component, computed, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { LoginService } from '../../../core/auth/services/login.service';
import { ApiSuccessResponse } from '../../../core/models/api-response.interface';
import { CreatePostComponent } from '../posts/components/create-post/create-post.component';
import { PostCardComponent } from '../posts/components/post-card/post-card.component';
import { PostCardSkeletonComponent } from '../posts/components/post-card-skeleton/post-card-skeleton.component';
import { PostFeedResponse } from '../posts/models/post.interface';
import { PostService } from '../posts/services/post.service';

import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { EmptyStateComponent } from '../../../shared/components/business/empty-state/empty-state.component';

@Component({
  selector: 'app-feeds',
  imports: [
    CreatePostComponent,
    PostCardComponent,
    PostCardSkeletonComponent,
    EmptyStateComponent,
  ],
  templateUrl: './feeds.component.html',
})
export class FeedsComponent {
  private readonly postService = inject(PostService);
  private readonly loginService = inject(LoginService);
  private readonly route = inject(ActivatedRoute);

  user = this.loginService.user;
  queryParams = toSignal(this.route.queryParams);

  feedQuery = injectQuery(() => {
    const params = this.queryParams() as any;
    const filter = params['filter'];

    return {
      queryKey: ['feed', filter],
      queryFn: () => {
        if (filter === 'saved') {
          return this.postService.getBookmarks();
        }
        return this.postService.getFeed(filter);
      },
      select: (res: ApiSuccessResponse<PostFeedResponse>) =>
        'posts' in res.data ? res.data.posts : res.data.bookmarks,
    };
  });

  posts = computed(() => {
    return this.feedQuery.data();
  });
}
