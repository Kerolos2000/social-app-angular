import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../../../../../../shared/components/business/button/button.component';

@Component({
  selector: 'app-post-dropdown',
  imports: [ButtonComponent],
  templateUrl: './post-dropdown.component.html',
})
export class PostDropdownComponent {
  postId = input.required<string>();
  isMyPost = input.required<boolean>();

  onCopyLink = output<void>();
  onEditPost = output<void>();
  onDeleteToggle = output<void>();

  copyLink() {
    this.onCopyLink.emit();
  }

  editPost() {
    this.onEditPost.emit();
  }

  deleteToggle() {
    this.onDeleteToggle.emit();
  }
}
