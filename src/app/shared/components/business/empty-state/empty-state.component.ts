import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.component.html',
})
export class EmptyStateComponent {
  @Input() icon: string = 'fa-regular fa-newspaper';
  @Input() message: string = 'No data found';
}
