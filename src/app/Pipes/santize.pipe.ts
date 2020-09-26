import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'santize'
})
export class SantizePipe implements PipeTransform {
  constructor(public sanitize: DomSanitizer) { }
  transform(value: any, type?): any {
    if (type) {
      return this.sanitize.bypassSecurityTrustStyle(value);
    } else {
      return this.sanitize.bypassSecurityTrustHtml(value);
  }
}

}
