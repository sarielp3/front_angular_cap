import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;

    if (currentUser) {
      var currentDate = new Date();
      var expires = new Date(currentUser.Token.Expires);

      if (expires <= currentDate) {
        alert('Tu session ha caducado.');
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        this.authenticationService.logout();
        return false;
      }

      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(currentUser.Role) === -1
      ) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
