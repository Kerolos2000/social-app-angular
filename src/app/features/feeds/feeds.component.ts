import { Component } from '@angular/core';
import { CreatePostComponent } from './components/create-post/create-post.component';

@Component({
  selector: 'app-feeds',
  imports: [CreatePostComponent],
  templateUrl: './feeds.component.html',
})
export class FeedsComponent {}
