import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../../../../../core/auth/services/login.service';
import { ROUTES } from '../../../../../../../core/constants/routes';
import { ApiSuccessResponse } from '../../../../../../../core/models/api-response.interface';
import { ButtonComponent } from '../../../../../../../shared/components/business/button/button.component';
import { ImgFallbackDirective } from '../../../../../../../shared/directives/img-fallback.directive';
import { RelativeTimePipe } from '../../../../../../../shared/pipes/relative-time.pipe';
import { Post } from '../../../../models/post.interface';
import { Privacy, PRIVACY_CONFIG } from '../../../../models/privacy.interface';
import { PostService } from '../../../../services/post.service';
import { PostDropdownComponent } from '../post-dropdown/post-dropdown.component';
import { ConfirmDialogComponent } from '../../../../../../../shared/components/business/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-post-header',
  imports: [
    RelativeTimePipe,
    ImgFallbackDirective,
    ButtonComponent,
    RouterLink,
    PostDropdownComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './post-header.component.html',
})
export class PostHeaderComponent implements AfterViewInit {
  ROUTES = ROUTES;
  post = input.required<Post>();

  onEdit = output<void>();

  privacyConfig = computed(() => {
    const value = this.post().privacy as Privacy;
    return PRIVACY_CONFIG[value] || PRIVACY_CONFIG.public;
  });

  postService = inject(PostService);
  queryClient = inject(QueryClient);
  loginService = inject(LoginService);
  toastr = inject(ToastrService);

  isMyPost = computed(() => {
    return this.post().user._id === this.loginService.user()?._id;
  });

  mutation = injectMutation(() => ({
    mutationFn: (postId: string) => this.postService.bookmarkPost(postId),
    onSuccess: () => {
      return Promise.all([
        this.queryClient.invalidateQueries({ queryKey: ['feed'] }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.post().id],
        }),
      ]);
    },
  }));

  toggleBookmark(action: string) {
    if (action === 'bookmark') {
      this.mutation.mutate(this.post().id);
    }
  }

  deleteMutation = injectMutation(() => ({
    mutationFn: (postId: string) => this.postService.deletePost(postId),
    onSuccess: (res: ApiSuccessResponse<void>) => {
      this.toastr.success(res.message);
      // Close the modal upon success since flowbite init doesn't handle reactive content easily without re-init,
      // but data-modal-hide usually works or we can re-fetch feed.
      // Easiest is simulating clicking the close button or let flowbite handle it via an event if needed, 
      // but Angular Query invalidate will remove the post from DOM anyway.
      return Promise.all([
        this.queryClient.invalidateQueries({ queryKey: ['feed'] }),
      ]);
    },
    onError: (error) => {
      this.toastr.error(error.message);
    },
  }));

  copyLink() {
    const url = `${window.location.origin}/post/${this.post().id}`;
    navigator.clipboard.writeText(url).then(() => {
      this.toastr.success('Link copied to clipboard');
    });
  }

  confirmDelete() {
    this.deleteMutation.mutate(this.post().id);
  }

  editPost() {
    this.onEdit.emit();
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }
}
