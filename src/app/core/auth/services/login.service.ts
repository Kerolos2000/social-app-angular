import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
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

  private readonly storedUser = localStorage.getItem('user');

  private readonly _user = signal<User | null>(
    this.storedUser ? JSON.parse(this.storedUser) : null,
  );

  readonly user = this._user.asReadonly();

  login(data: object) {
    return lastValueFrom(
      this.http
        .post<AuthSuccessResponse>(`${environment.BASE_URL}/users/signin`, data)
        .pipe(
          tap((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this._user.set(res.data.user);
            this.router.navigateByUrl(ROUTES.FEEDS);
          }),
        ),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._user.set(null);
    this.router.navigateByUrl(ROUTES.LOGIN);
  }
}
