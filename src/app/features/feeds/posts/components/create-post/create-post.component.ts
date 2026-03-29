import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { LoginService } from '../../../../../core/auth/services/login.service';
import { ButtonComponent } from '../../../../../shared/components/business/button/button.component';
import { DropdownPrivacyComponent } from './dropdown-privacy/dropdown-privacy.component';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

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
  private readonly fb = inject(FormBuilder);

  user = this.loginService.user;

  postForm: FormGroup = this.fb.group({
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
    if (!this.isPostValid) return;

    const formData = new FormData();
    const postText = this.postForm.get('postText')?.value;
    if (postText) formData.append('postText', postText);

    formData.append('visibility', this.postForm.get('visibility')?.value);

    const imageInput = this.selectedImage();
    if (imageInput) formData.append('image', imageInput);

    console.log('🚀 ~ formData:', this.postForm.value);

    this.postForm.reset({ visibility: this.postForm.get('visibility')?.value });
    this.selectedImage.set(null);
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
