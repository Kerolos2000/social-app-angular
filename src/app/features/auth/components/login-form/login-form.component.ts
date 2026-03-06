import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorControlComponent } from '../../../../shared/business/error-control/error-control.component';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, ErrorControlComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly loginService: LoginService = inject(LoginService);

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
      next: (e) => {
        console.log(e);
        this.loading = false;
      },
      error: (err) => {
        this.formError = err.error.message;
        this.loading = false;
      },
    });
  }
}
