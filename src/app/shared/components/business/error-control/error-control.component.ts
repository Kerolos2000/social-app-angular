import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-control',
  imports: [],
  templateUrl: './error-control.component.html',
})
export class ErrorControlComponent {
  control = input.required<AbstractControl | null>();
  messages = input.required<Record<string, string>>();

  errorKeys = computed(() => {
    const ctrl = this.control();
    return ctrl?.errors ? Object.keys(ctrl.errors) : [];
  });
}
