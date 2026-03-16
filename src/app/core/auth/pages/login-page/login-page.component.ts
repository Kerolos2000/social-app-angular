import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  loading: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.loginService.login(this.loginForm.value).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
}
