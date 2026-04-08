import { Routes } from '@angular/router';
import { anonymousGuard } from './core/auth/guards/anonymous-guard';
import { protectedGuard } from './core/auth/guards/protected-guard';
import { ROUTES } from './core/constants/routes';
import { FeedsComponent } from './features/feeds/components/feeds.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { SettingsComponent } from './features/settings/settings.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.FEEDS,
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [protectedGuard],
    children: [
      {
        path: ROUTES.FEEDS,
        component: FeedsComponent,
      },
      {
        path: ROUTES.PROFILE,
        component: ProfileComponent,
      },
      {
        path: ROUTES.PROFILE + '/:id',
        component: ProfileComponent,
      },
      {
        path: ROUTES.SETTINGS,
        component: SettingsComponent,
      },
      {
        path: ROUTES.NOTIFICATIONS,
        component: NotificationsComponent,
      },
      {
        path: ROUTES.POST_DETAILS + ':id',
        loadComponent: () =>
          import('./features/feeds/posts/pages/post-details/post-details.component').then(
            (c) => c.PostDetailsComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [anonymousGuard],
    children: [
      {
        path: ROUTES.LOGIN,
        loadComponent: () =>
          import('./core/auth/pages/login-page/login-page.component').then(
            (c) => c.LoginPageComponent,
          ),
      },
      {
        path: ROUTES.REGISTER,
        loadComponent: () =>
          import('./core/auth/pages/register-page/register-page.component').then(
            (c) => c.RegisterPageComponent,
          ),
      },
    ],
  },
];
