import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../constants/routes';
import { environment } from '../../environments/environment';
import { AuthSuccessResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  login(data: object) {
    return this.http.post<AuthSuccessResponse>(
      `${environment.BASE_URL}/users/signin`,
      data,
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl(ROUTES.LOGIN);
  }
}
