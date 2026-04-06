import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { PostEditorComponent } from '../../../../../../../shared/components/business/post-editor/post-editor.component';

@Component({
  selector: 'app-post-content',
  imports: [PostEditorComponent],
  templateUrl: './post-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostContentComponent {
  body = input.required<string>();
  image = input<string>();
  isEditing = input<boolean>(false);
  isSaving = input<boolean>(false);

  onCancel = output<void>();
  onSave = output<string>();

  onEditSave(newBody: string) {
    this.onSave.emit(newBody);
  }

  onEditCancel() {
    this.onCancel.emit();
  }
}
