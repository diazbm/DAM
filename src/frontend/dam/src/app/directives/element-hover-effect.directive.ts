import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appElementHoverEffect]',
  standalone: true
})
export class ElementHoverEffectDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setInitialStyle();
  }

  private setInitialStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease, filter 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ccc');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'brightness(1)');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.015)');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'brightness(1.2)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ccc');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'brightness(1)');
  }

  @HostListener('touchstart') onTouchStart() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.015)');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#fff');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'brightness(1.2)');
  }

  @HostListener('touchend') onTouchEnd() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#ccc');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'brightness(1)');
  }
}
