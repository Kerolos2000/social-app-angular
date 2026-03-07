import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment.development';
import { AuthSuccessResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly http = inject(HttpClient);

  register(data: Object) {
    return this.http.post<AuthSuccessResponse>(
      `${environment.BASE_URL}/users/signup`,
      data,
    );
  }
}
