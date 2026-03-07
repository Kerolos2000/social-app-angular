import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorControlComponent } from '../../../../shared/components/business/error-control/error-control.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, ErrorControlComponent, RouterLink],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly router: Router = inject(Router);

  formError: string = '';
  loading: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.formError = '';

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.loading = false;
        this.router.navigate(['/feed']);
      },
      error: (err: HttpErrorResponse) => {
        this.formError = err.error.message;
        this.loading = false;
      },
    });
  }
}
