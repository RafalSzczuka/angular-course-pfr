import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHoverDirective {

  // Opcjonalne kolory, które mogą być ustawione przy użyciu tej dyrektywy
  @Input() hoverColor: string = 'dodgerblue';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // Obsługuje zdarzenie 'mouseenter' - zmienia styl, gdy użytkownik najedzie myszką na element
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.hoverColor);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'background-color 0.3s ease');
  }

  // Obsługuje zdarzenie 'mouseleave' - przywraca pierwotny styl, gdy myszka opuszcza element
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }

}
