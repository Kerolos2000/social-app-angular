import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-post-editor',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './post-editor.component.html',
})
export class PostEditorComponent {
  initialValue = input.required<string>();
  placeholder = input<string>("What's on your mind?");
  saveText = input<string>('Save');
  isLoading = input<boolean>(false);

  onSave = output<string>();
  onCancel = output<void>();

  value = '';

  ngOnChanges() {
    this.value = this.initialValue();
  }

  save() {
    if (
      this.value.trim() &&
      (this.value.trim() !== this.initialValue() || this.isLoading())
    ) {
      this.onSave.emit(this.value);
    } else if (this.value.trim() === this.initialValue()) {
      this.onCancel.emit();
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
