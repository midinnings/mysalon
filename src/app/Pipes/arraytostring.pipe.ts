import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arraytostring'
})
export class ArraytostringPipe implements PipeTransform {

  transform(value: any, parameter?: any): any {
    let newvalue = [];
    if (parameter) {
      value.forEach(element => {
        newvalue.push(element[parameter]);
      });
    } else {
      newvalue = value.split(",");
    }
    return newvalue.toString().replace(/,/g, ", ");
  }
}
