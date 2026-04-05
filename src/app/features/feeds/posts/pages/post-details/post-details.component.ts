import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { ApiSuccessResponse } from '../../../../../core/models/api-response.interface';
import { PostCardSkeletonComponent } from '../../components/post-card-skeleton/post-card-skeleton.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { PostResponse } from '../../models/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-details',
  imports: [PostCardComponent, PostCardSkeletonComponent],
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  private readonly loginService = inject(LoginService);

  user = this.loginService.user;

  postQuery = injectQuery(() => {
    const postId = this.route.snapshot.paramMap.get('id');
    return {
      queryKey: ['post', postId],
      queryFn: () => this.postService.getPostById(postId!),
      enabled: !!postId,
      select: (res: ApiSuccessResponse<PostResponse>) => res.data.post,
    };
  });
}
