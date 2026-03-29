import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  icon = input<string>('fa-regular fa-newspaper');
  message = input<string>('No data found');
}
