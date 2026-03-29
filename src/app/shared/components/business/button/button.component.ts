import { Component, input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  templateUrl: './button.component.html',
  host: {
    '[type]': 'type()',
    '[disabled]': '(disabled() || isLoading()) || null',
    class: 'btn flex items-center justify-center gap-2 cursor-pointer',
  },
})
export class ButtonComponent {
  isLoading = input<boolean>(false);
  icon = input<string | undefined>();
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
}
