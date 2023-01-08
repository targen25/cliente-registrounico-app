import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.check();
  }

  private check(): boolean {
    //debugger;
    let token = localStorage.getItem('ru_token')
    if (token != null) {//si el usuario esta en session te envia directo al home
      this.router.navigate(['/']);
      return false;
    } else {//flag para mostrar páginas, que no necesitan una autorización, libre para todos
      return true;
    }

  }

}
