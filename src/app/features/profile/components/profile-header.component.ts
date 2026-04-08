import { Component, input } from '@angular/core';
import { UserProfile } from '../models/profile.interface';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
})
export class ProfileHeaderComponent {
  profile = input<UserProfile | undefined>();
  isOwnProfile = input<boolean>(false);
}
