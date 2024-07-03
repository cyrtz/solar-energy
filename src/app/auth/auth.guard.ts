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
        // 檢查 token 是否過期
        const exp = new Date(Number(payload.exp) * 1000);
        if (new Date() > exp) {
          alert('token已過期，請重新登入');
          localStorage.clear();
          return this.router.createUrlTree(['app-login']);
        }
        // 檢查 token 是否有權限存取或編輯當前頁面
        const userRole = payload.customRole;
        const allowedPages = payload.pages || [];
        if (userRole == 'Admin' || userRole == 'Editor') {
          return true;
        }else if (userRole == 'Viewer') {
          if (allowedPages.includes(route.routeConfig?.path)) {
            return true;
          } else {
            alert('您無權訪問此頁面');
            return this.router.createUrlTree(['app-home/app-dashboard']);
          }
        }
      } catch (error) {
        console.error('token解析失敗:', error);
        alert('無效的token，請重新登入');
        localStorage.clear();
        return this.router.createUrlTree(['app-login']);
      }
    } else {
      alert('尚未登入');
      localStorage.clear();
      return this.router.createUrlTree(['app-login']);
    }

    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
