import { Component, Input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  templateUrl: './button.component.html',
  host: {
    '[type]': 'type',
    '[disabled]': '(disabled || isLoading) || null',
    class: 'btn flex items-center justify-center gap-2 cursor-pointer',
  },
})
export class ButtonComponent {
  @Input({ required: true }) isLoading: boolean = false;
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
}
