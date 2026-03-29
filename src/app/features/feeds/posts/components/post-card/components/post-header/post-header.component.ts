import { Component, computed, input } from '@angular/core';
import { ImgFallbackDirective } from '../../../../../../../shared/directives/img-fallback.directive';
import { User } from '../../../../../../../shared/models/user.interface';
import { RelativeTimePipe } from '../../../../../../../shared/pipes/relative-time.pipe';
import { PRIVACY_CONFIG, Privacy } from '../../../../models/privacy.interface';

@Component({
  selector: 'app-post-header',
  imports: [RelativeTimePipe, ImgFallbackDirective],
  templateUrl: './post-header.component.html',
})
export class PostHeaderComponent {
  user = input.required<User>();
  createdAt = input.required<string>();
  privacy = input.required<string>();

  privacyConfig = computed(() => {
    const value = this.privacy() as Privacy;
    return PRIVACY_CONFIG[value] || PRIVACY_CONFIG.public;
  });
}
