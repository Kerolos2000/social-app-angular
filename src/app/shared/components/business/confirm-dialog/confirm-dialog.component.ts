import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-confirm-dialog',
  imports: [ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  id = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  confirmText = input<string>('Confirm');
  cancelText = input<string>('Cancel');
  isLoading = input<boolean>(false);
  confirmButtonClass = input<string>('btn-danger');

  onConfirm = output<void>();
  onCancel = output<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
