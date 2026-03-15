import { Routes } from '@angular/router';
import { anonymousGuard } from './core/auth/guards/anonymous-guard';
import { protectedGuard } from './core/auth/guards/protected-guard';
import { LoginPageComponent } from './core/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './core/auth/pages/register-page/register-page.component';
import { FeedsComponent } from './features/feeds/feeds/feeds.component';
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
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [anonymousGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
    ],
  },
];
