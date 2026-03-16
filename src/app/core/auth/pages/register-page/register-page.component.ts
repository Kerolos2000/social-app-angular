import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorControlComponent } from '../../../../shared/components/business/error-control/error-control.component';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, ErrorControlComponent, RouterLink],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly registerService: RegisterService = inject(RegisterService);

  loading: boolean = false;

  registerForm: FormGroup = this.formBuilder.group(
    {
      name: ['', Validators.required],
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-z0-9_]{3,30}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern('male|female')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required],
    },
    { validators: this.confirmPassword },
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    if (password !== rePassword && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });

      return { mismatch: true };
    }
    return null;
  }

  registerSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;

    this.registerService.register(this.registerForm.value).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
}
