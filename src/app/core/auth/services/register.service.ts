import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { ROUTES } from '../../constants/routes';
import { environment } from '../../environments/environment';
import { ApiSuccessResponse } from '../../models/api-response.interface';
import { AuthSuccessData } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly router: Router = inject(Router);

  register(data: Object) {
    return lastValueFrom(
      this.http
        .post<
          ApiSuccessResponse<AuthSuccessData>
        >(`${environment.BASE_URL}/users/signup`, data)
        .pipe(tap(() => this.router.navigateByUrl(ROUTES.LOGIN))),
    );
  }
}
