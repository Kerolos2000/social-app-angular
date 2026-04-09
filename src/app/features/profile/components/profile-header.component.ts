import { Component, inject, input } from '@angular/core';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/auth/services/login.service';
import { UserProfile } from '../models/profile.interface';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
})
export class ProfileHeaderComponent {
  private readonly profileService = inject(ProfileService);
  private readonly toastr = inject(ToastrService);
  private readonly queryClient = inject(QueryClient);
  private readonly loginService = inject(LoginService);

  profile = input<UserProfile | undefined>();
  isOwnProfile = input<boolean>(false);

  uploadPhotoMutation = injectMutation(() => ({
    mutationFn: (file: File) => this.profileService.uploadProfilePhoto(file),
    onSuccess: async () => {
      this.toastr.success('Profile photo updated successfully');
      
      const userId = this.loginService.user()?._id;
      if (userId) {
        try {
          const profileData = await this.profileService.getUserProfile(userId);
          if (profileData?.data?.user?.photo) {
            this.loginService.updateUser({ photo: profileData.data.user.photo });
          }
        } catch (e) {
          console.error('Failed to sync updated profile photo', e);
        }
      }

      this.queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
      // Also invalidate feed/posts as the user's photo might be shown on their posts/comments
      this.queryClient.invalidateQueries({
        predicate: (query) => {
          const key = query.queryKey[0] as string;
          return key === 'feed' || key === 'post' || key === 'profile-posts' || key === 'post-comments' || key === 'comment-replies';
        }
      });
    },
  }));

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadPhotoMutation.mutate(input.files[0]);
    }
    input.value = '';
  }
}
