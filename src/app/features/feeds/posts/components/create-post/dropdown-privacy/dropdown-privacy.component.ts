import { Component, computed, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { startWith, switchMap } from 'rxjs';
import {
  VISIBILITY_OPTIONS,
  VisibilityOption,
} from '../../../models/privacy.interface';

@Component({
  selector: 'app-dropdown-privacy',
  templateUrl: './dropdown-privacy.component.html',
})
export class DropdownPrivacyComponent {
  control = input.required<FormControl>();

  options = signal<VisibilityOption[]>(VISIBILITY_OPTIONS);

  private controlValue = toSignal(
    toObservable(this.control).pipe(
      switchMap((ctrl) => ctrl.valueChanges.pipe(startWith(ctrl.value))),
    ),
  );

  selectedOption = computed(() =>
    this.options().find((o) => o.value === this.controlValue()),
  );

  setVisibility(value: string) {
    this.control().setValue(value);
  }
}
