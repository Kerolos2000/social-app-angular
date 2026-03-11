import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-control',
  imports: [],
  templateUrl: './error-control.component.html',
})
export class ErrorControlComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) messages!: Record<string, string>;

  get errorKeys() {
    return this.control?.errors ? Object.keys(this.control.errors) : [];
  }
}
