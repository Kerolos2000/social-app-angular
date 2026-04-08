import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-stats',
  standalone: true,
  templateUrl: './profile-stats.component.html',
})
export class ProfileStatsComponent {
  followersCount = input<number>(0);
  followingCount = input<number>(0);
  bookmarksCount = input<number>(0);
}
