import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user',
  pure: true
})
export class UserPipe implements PipeTransform {

  transform(value: any): any {
    let UserInfo = JSON.parse(localStorage.getItem("UserProfile"));
    return UserInfo[value];
  }
}
