import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { ImagePreviewComponent } from '../../../../../shared/components/business/image-preview/image-preview.component';
import { User } from '../../../../../shared/models/user.interface';
import { CommentService } from '../../services/comment.service';

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
  commentId = input<string | null>(null);
  initialContent = input<string>('');
  isEdit = input<boolean>(false);

  commentAdded = output<void>();
  commentUpdated = output<void>();
  cancel = output<void>();

  commentForm = this.formBuilder.group({
    comment: [this.initialContent(), [Validators.required, Validators.minLength(1)]],
    image: [null as File | null],
  });

  ngOnInit() {
    if (this.isEdit()) {
      this.commentForm.patchValue({ comment: this.initialContent() });
    }
  }

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

      if (this.isEdit() && this.commentId()) {
        return this.commentService.updateComment(
          this.postId(),
          this.commentId()!,
          content,
          image || undefined,
        );
      }

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
      if (this.isEdit()) {
        this.commentUpdated.emit();
      } else {
        this.commentAdded.emit();
      }

      this.commentForm.reset();
      this.selectedImage.set(null);

      return Promise.all([
        this.queryClient.invalidateQueries({
          queryKey: ['post-comments', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['comment-replies', this.parentCommentId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['feed'],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['post', this.postId()],
        }),
        this.queryClient.invalidateQueries({
          queryKey: ['profile-posts'],
        }),
      ]);
    },
  }));
}
