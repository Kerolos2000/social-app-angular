import { Directive, ElementRef, HostListener, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallbackDirective {
  private el = inject(ElementRef<HTMLImageElement>);
  private renderer = inject(Renderer2);

  appImgFallback = input<string>('image-broken.png');

  @HostListener('error')
  onError() {
    const defaultImage = this.appImgFallback() || 'image-broken.png';
    this.renderer.setAttribute(this.el.nativeElement, 'src', defaultImage);
  }
}
