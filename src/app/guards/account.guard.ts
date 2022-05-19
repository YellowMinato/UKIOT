import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services/commonfunc.service';
@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {
  constructor(public CF: CommonService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    (!this.CF.isActivated) ? this.CF.SwalWarning('Account', 'Verification pending!') : true;
    return (this.CF.isActivated) ? true : false;
  }
}
