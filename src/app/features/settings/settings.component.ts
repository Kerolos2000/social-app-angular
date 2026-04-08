import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../core/auth/services/login.service';
import { ButtonComponent } from '../../shared/components/business/button/button.component';
import { ErrorControlComponent } from '../../shared/components/business/error-control/error-control.component';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, ErrorControlComponent, ButtonComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  private readonly toastr = inject(ToastrService);

  mutation = injectMutation(() => ({
    mutationFn: (data: any) => this.loginService.changePassword(data),
    onSuccess: () => {
      this.toastr.success('Password changed successfully');
      this.passwordForm.reset();
    },
  }));

  passwordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.passwordForm.invalid) return;
    this.mutation.mutate(this.passwordForm.value);
  }
}
