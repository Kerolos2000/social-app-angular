import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ErrorControlComponent } from '../../../../shared/components/business/error-control/error-control.component';
import { ButtonComponent } from '../../../../shared/components/business/button/button.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule,
    ErrorControlComponent,
    RouterLink,
    ButtonComponent,
  ],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly loginService: LoginService = inject(LoginService);

  mutation = injectMutation(() => ({
    mutationFn: (data: object) => this.loginService.login(data),
  }));

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginSubmit() {
    if (this.loginForm.invalid) return;

    this.mutation.mutate(this.loginForm.value);
  }
}
