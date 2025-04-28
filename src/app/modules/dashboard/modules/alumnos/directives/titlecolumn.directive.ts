import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitlecolumn]',
  standalone: false
})
export class TitlecolumnDirective {

  constructor(private element: ElementRef) { 
    this.element.nativeElement.style.fontSize = "20px";
  }

}
