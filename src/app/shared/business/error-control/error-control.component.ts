import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-control',
  imports: [],
  templateUrl: './error-control.component.html',
})
export class ErrorControlComponent {
  @Input() control!: AbstractControl | null;
  @Input() messages: Record<string, string> = {};

  get errorKeys() {
    return this.control?.errors ? Object.keys(this.control.errors) : [];
  }
}
