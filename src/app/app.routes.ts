import { Routes } from '@angular/router';
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
