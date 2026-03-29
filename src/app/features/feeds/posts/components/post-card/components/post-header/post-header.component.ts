import { Component, computed, inject, input } from '@angular/core';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ButtonComponent } from '../../../../../../../shared/components/business/button/button.component';
import { ImgFallbackDirective } from '../../../../../../../shared/directives/img-fallback.directive';
import { RelativeTimePipe } from '../../../../../../../shared/pipes/relative-time.pipe';
import { Post } from '../../../../models/post.interface';
import { Privacy, PRIVACY_CONFIG } from '../../../../models/privacy.interface';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-header',
  imports: [RelativeTimePipe, ImgFallbackDirective, ButtonComponent],
  templateUrl: './post-header.component.html',
})
export class PostHeaderComponent {
  post = input.required<Post>();

  privacyConfig = computed(() => {
    const value = this.post().privacy as Privacy;
    return PRIVACY_CONFIG[value] || PRIVACY_CONFIG.public;
  });

  postService = inject(PostService);
  queryClient = inject(QueryClient);

  mutation = injectMutation(() => ({
    mutationFn: (postId: string) => this.postService.bookmarkPost(postId),
    onSuccess: () => {
      return this.queryClient.invalidateQueries({
        queryKey: ['feed'],
      });
    },
  }));

  toggleBookmark(action: string) {
    if (action === 'bookmark') {
      this.mutation.mutate(this.post().id);
    }
  }
}
