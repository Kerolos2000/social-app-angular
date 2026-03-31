import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
})
export class ImagePreviewComponent {
  file = input.required<File | null>();
  remove = output<void>();

  previewUrl = signal<string | null>(null);

  constructor() {
    effect((onCleanup) => {
      const f = this.file();

      if (!f) {
        this.previewUrl.set(null);
        return;
      }

      const url = URL.createObjectURL(f);
      this.previewUrl.set(url);

      onCleanup(() => URL.revokeObjectURL(url));
    });
  }

  onRemove() {
    this.remove.emit();
  }
}
