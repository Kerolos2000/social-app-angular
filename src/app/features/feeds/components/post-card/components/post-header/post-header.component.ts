import { Component, Input } from '@angular/core';
import { ImgFallbackDirective } from '../../../../../../shared/directives/img-fallback.directive';
import { User } from '../../../../../../shared/models/user.interface';
import { RelativeTimePipe } from '../../../../../../shared/pipes/relative-time.pipe';

@Component({
  selector: 'app-post-header',
  imports: [RelativeTimePipe, ImgFallbackDirective],
  templateUrl: './post-header.component.html',
})
export class PostHeaderComponent {
  @Input() user!: User;
  @Input() createdAt!: string;
  @Input() privacy!: string;
}
