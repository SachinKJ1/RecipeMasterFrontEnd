import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';
import { LocalService } from '../services/local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private auth: AuthenticateService,
    private router: Router,
    private localService: LocalService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.localService.toNotify('red', 'You are not logged in');
      this.router.navigateByUrl('/');
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.localService.toNotify('red', 'You are not logged in');
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
