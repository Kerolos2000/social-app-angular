import { Routes } from '@angular/router';
import { anonymousGuard } from './core/auth/guards/anonymous-guard';
import { protectedGuard } from './core/auth/guards/protected-guard';
import { FeedsComponent } from './features/feeds/feeds.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [protectedGuard],
    children: [
      {
        path: 'feeds',
        component: FeedsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [anonymousGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/pages/login-page/login-page.component').then(
            (c) => c.LoginPageComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/pages/register-page/register-page.component').then(
            (c) => c.RegisterPageComponent,
          ),
      },
    ],
  },
];
