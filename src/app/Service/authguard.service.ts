
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('UserId')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
// export class AuthguardService2 implements CanActivate {

//   constructor(private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (localStorage.getItem('favSalon')===false) {
//       return true;
//     }
//     this.router.navigate(['/app/tabs/featured-dashboard']);
//     return false;
//   }
// }
