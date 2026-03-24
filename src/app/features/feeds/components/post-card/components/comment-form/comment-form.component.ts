import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../../../shared/models/user.interface';

@Component({
  selector: 'app-comment-form',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent {
  private readonly fb = inject(FormBuilder);
  user = input.required<User>();
  onSubmit = output<string>();

  commentControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  submit(event?: any) {
    if (event && event.preventDefault) event.preventDefault();
    if (this.commentControl.valid) {
      this.onSubmit.emit(this.commentControl.value!);
      this.commentControl.reset();
    }
  }
}
