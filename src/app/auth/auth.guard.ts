import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild{

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(window.atob(token.split('.')[1]));
        const exp = new Date(Number(payload.exp) * 1000);
        if (new Date() > exp) {
          alert('token已過期，請重新登入');
          localStorage.removeItem('token');
          // localStorage.clear();
          return this.router.createUrlTree(['']); // 返回 UrlTree 導航到登錄頁面
        }
      } catch (error) {
        console.error('token解析失敗:', error);
        alert('無效的token，請重新登入');
        return this.router.createUrlTree(['']); // 返回 UrlTree 導航到登錄頁面
      }
    } else {
      alert('尚未登入');
      return this.router.createUrlTree(['']); // 返回 UrlTree 導航到登錄頁面
    }

    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
