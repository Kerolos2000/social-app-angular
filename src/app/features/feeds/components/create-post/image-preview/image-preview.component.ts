import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-image-preview',
  imports: [],
  templateUrl: './image-preview.component.html',
})
export class ImagePreviewComponent implements OnChanges {
  @Input({ required: true }) file!: File;
  @Output() remove = new EventEmitter<void>();

  previewUrl: string | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && this.file) {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.previewUrl = URL.createObjectURL(this.file);
    }
  }

  onRemove() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
    this.remove.emit();
  }
}
