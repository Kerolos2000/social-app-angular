import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROUTES } from '../../constants/routes';

export const anonymousGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  return token ? router.parseUrl(ROUTES.FEEDS) : true;
};
