import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthSuccessResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http = inject(HttpClient);

  login(data: object) {
    return this.http.post<AuthSuccessResponse>(
      `${environment.BASE_URL}/users/signin`,
      data,
    );
  }
}
