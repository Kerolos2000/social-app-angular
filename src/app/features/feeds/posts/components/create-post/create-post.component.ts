import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { initFlowbite } from 'flowbite';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { ImagePreviewComponent } from '../../../../../shared/components/business/image-preview/image-preview.component';
import { PostService } from '../../services/post.service';
import { DropdownPrivacyComponent } from './dropdown-privacy/dropdown-privacy.component';

@Component({
  selector: 'app-create-post',
  imports: [
    ReactiveFormsModule,
    DropdownPrivacyComponent,
    ImagePreviewComponent,
    ButtonComponent,
  ],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  private readonly loginService = inject(LoginService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly postService = inject(PostService);
  private readonly queryClient = inject(QueryClient);

  user = this.loginService.user;

  createPostMutation = injectMutation(() => {
    return {
      mutationFn: (formData: FormData) => this.postService.createPost(formData),
      onSuccess: () => {
        this.postForm.reset({
          visibility: this.postForm.get('visibility')?.value,
        });
        this.selectedImage.set(null);
        return this.queryClient.invalidateQueries({ queryKey: ['feed'] });
      },
    };
  });

  postForm: FormGroup = this.formBuilder.group({
    postText: [''],
    visibility: [
      'public',
      [Validators.required, Validators.pattern('public|following|only_me')],
    ],
    image: [null],
  });

  selectedImage = signal<File | null>(null);

  getFormControl(name: string): FormControl {
    return this.postForm.get(name) as FormControl;
  }

  get isPostValid(): boolean {
    const text = this.postForm.get('postText')?.value;
    const img = this.selectedImage();
    return !!(text?.trim() || img);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.postForm.patchValue({ image: file });
      this.selectedImage.set(file);
    }
    input.value = '';
  }

  removeImage() {
    this.postForm.patchValue({ image: null });
    this.selectedImage.set(null);
  }

  submitPost() {
    if (!this.isPostValid || this.createPostMutation.isPending()) return;

    const formData = new FormData();
    const postText = this.postForm.get('postText')?.value;
    if (postText) formData.append('body', postText);

    const imageInput = this.selectedImage();
    if (imageInput) formData.append('image', imageInput);

    formData.append('privacy', this.postForm.get('visibility')?.value);

    this.createPostMutation.mutate(formData);
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
