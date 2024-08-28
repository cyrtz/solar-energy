import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

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
          this.openSnackBar('token已過期，請重新登入', '關閉');
          localStorage.clear();
          return this.router.createUrlTree(['app-login']);
        }
        // 檢查 token 是否有權限存取或編輯當前頁面
        const userRole = payload.customRole;
        const allowedPages = payload.pages || [];
        if (userRole == 'Admin' || userRole == 'Editor') {
          return true;
        } else if (userRole == 'Viewer') {
          if (allowedPages.includes(route.routeConfig?.path)) {
            return true;
          } else {
            this.openSnackBar('您無權訪問此頁面', '關閉');
            return this.router.createUrlTree(['app-home/app-dashboard']);
          }
        }
      } catch (error) {
        // console.error('token解析失敗:', error);
        this.openSnackBar('無效的token，請重新登入', '關閉');
        localStorage.clear();
        return this.router.createUrlTree(['app-login']);
      }
    } else {
      this.openSnackBar('尚未登入', '關閉ㄋ');
      localStorage.clear();
      return this.router.createUrlTree(['app-login']);
    }
    return true;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
