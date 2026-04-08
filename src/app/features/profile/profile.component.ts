import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { LoginService } from '../../core/auth/services/login.service';
import { ProfileHeaderComponent } from './components/profile-header.component';
import { ProfileStatsComponent } from './components/profile-stats.component';
import { ProfileAboutComponent } from './components/profile-about.component';
import { ProfileFeedComponent } from './components/profile-feed.component';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileHeaderComponent,
    ProfileStatsComponent,
    ProfileAboutComponent,
    ProfileFeedComponent,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly profileService = inject(ProfileService);
  private readonly loginService = inject(LoginService);

  private readonly routeParams = toSignal(this.route.params);

  userId = computed(() => {
    const id = this.routeParams()?.['id'];
    return id || this.loginService.user()?._id;
  });

  isOwnProfile = computed(() => {
    return this.userId() === this.loginService.user()?._id;
  });

  profileQuery = injectQuery(() => ({
    queryKey: ['profile', this.userId()],
    queryFn: () => this.profileService.getUserProfile(this.userId()!),
    enabled: !!this.userId(),
  }));

  activeTab = signal<'posts' | 'bookmarks'>('posts');

  postsQuery = injectQuery(() => ({
    queryKey: ['profile-posts', this.userId(), this.activeTab()],
    queryFn: () => {
      if (this.activeTab() === 'bookmarks') {
        return this.profileService.getUserBookmarks();
      }
      return this.profileService.getUserPosts(this.userId()!);
    },
    enabled: !!this.userId(),
  }));

  bookmarksQuery = injectQuery(() => ({
    queryKey: ['profile-bookmarks'],
    queryFn: () => this.profileService.getUserBookmarks(),
    enabled: !!this.userId() && this.isOwnProfile(),
  }));

  profile = computed(() => this.profileQuery.data()?.data.user);

  posts = computed(() => {
    const data = this.postsQuery.data()?.data;
    if (!data) return [];
    if ('posts' in data) return data.posts;
    if ('bookmarks' in data) return data.bookmarks;
    return [];
  });

  bookmarks = computed(() => {
    const data = this.bookmarksQuery.data()?.data;
    if (!data) return [];
    return 'bookmarks' in data ? data.bookmarks : [];
  });

  currentUser = this.loginService.user;

  switchTab(tab: 'posts' | 'bookmarks') {
    this.activeTab.set(tab);
  }
}
