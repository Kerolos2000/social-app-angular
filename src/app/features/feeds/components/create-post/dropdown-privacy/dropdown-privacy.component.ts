import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VisibilityOption } from '../../../models/privacy.interface';

@Component({
  selector: 'app-dropdown-privacy',
  templateUrl: './dropdown-privacy.component.html',
})
export class DropdownPrivacyComponent {
  @Input({ required: true }) control!: FormControl;

  options: VisibilityOption[] = [
    { value: 'public', label: 'Public', icon: 'fa-solid fa-earth-americas' },
    { value: 'following', label: 'Following', icon: 'fa-solid fa-user-group' },
    { value: 'only_me', label: 'Private', icon: 'fa-solid fa-lock' },
  ];

  setVisibility(value: string) {
    this.control.setValue(value);
  }

  getSelectedOption() {
    return this.options.find((o) => o.value === this.control.value);
  }
}
