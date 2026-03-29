import { CommonModule } from '@angular/common';
import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { User } from '../../../../../shared/models/user.interface';
import { CommentService } from '../../services/comment.service';
import { ImagePreviewComponent } from '../../../posts/components/create-post/image-preview/image-preview.component';

@Component({
  selector: 'app-comment-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ImagePreviewComponent,
    ButtonComponent,
  ],
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly commentService = inject(CommentService);
  private readonly queryClient = inject(QueryClient);

  user = input.required<User>();
  postId = input.required<string>();
  parentCommentId = input<string | null>(null);
  commentAdded = output<void>();

  commentForm = this.formBuilder.group({
    comment: ['', [Validators.required, Validators.minLength(1)]],
    image: [null as File | null],
  });

  selectedImage = signal<File | null>(null);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.commentForm.patchValue({ image: file });
      this.selectedImage.set(file);
    }
    input.value = '';
  }

  removeImage() {
    this.commentForm.patchValue({ image: null });
    this.selectedImage.set(null);
  }

  mutation = injectMutation(() => ({
    mutationFn: () => {
      const content = this.commentForm.get('comment')?.value || '';
      const image = this.selectedImage();
      const parentId = this.parentCommentId();

      if (parentId) {
        return this.commentService.createReply(
          this.postId(),
          parentId,
          content,
          image || undefined,
        );
      }

      return this.commentService.createComment(
        this.postId(),
        content,
        image || undefined,
      );
    },

    onSuccess: () => {
      this.commentForm.reset();
      this.selectedImage.set(null);
      this.commentAdded.emit();

      return Promise.all([
        this.queryClient.invalidateQueries({
          queryKey: ['post-comments', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['comment-replies', this.parentCommentId()],
        }),
      ]);
    },
  }));
}
