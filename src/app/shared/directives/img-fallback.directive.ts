import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallbackDirective {
  @Input() appImgFallback: string = 'image-broken.png';

  constructor(
    private el: ElementRef<HTMLImageElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('error')
  onError() {
    const defaultImage = this.appImgFallback || 'image-broken.png';
    this.renderer.setAttribute(this.el.nativeElement, 'src', defaultImage);
  }
}
