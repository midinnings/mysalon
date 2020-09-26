import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removelast'
})
export class RemovelastPipe implements PipeTransform {

  transform(value: any): any {
    return value.slice(0, -1);
  }

}
