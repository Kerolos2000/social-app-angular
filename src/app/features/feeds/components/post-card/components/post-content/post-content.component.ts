import { Component, input } from '@angular/core';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
})
export class PostContentComponent {
  body = input.required<string>();
  image = input<string>();
}
