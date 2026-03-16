import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { ROUTES } from '../../constants/routes';
import { environment } from '../../environments/environment';
import { AuthSuccessResponse } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly userLocalStorage = localStorage.getItem('user');

  readonly user: User | null = this.userLocalStorage
    ? JSON.parse(this.userLocalStorage)
    : null;

  login(data: object) {
    return this.http
      .post<AuthSuccessResponse>(`${environment.BASE_URL}/users/signin`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          this.router.navigateByUrl(ROUTES.FEEDS);
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl(ROUTES.LOGIN);
  }
}
