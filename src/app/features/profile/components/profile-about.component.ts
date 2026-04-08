import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserProfile } from '../models/profile.interface';

@Component({
  selector: 'app-profile-about',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './profile-about.component.html',
})
export class ProfileAboutComponent {
  profile = input<UserProfile | undefined>();
}
