import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateChildFn, CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (route,state): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
  const router = inject(Router);
  const _snackBar = inject(MatSnackBar);

  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      // 檢查 token 是否過期
      const exp = new Date(Number(payload.exp) * 1000);
      if (new Date() > exp) {
        openSnackBar(_snackBar, 'token已過期，請重新登入', '關閉');
        localStorage.clear();
        return router.createUrlTree(['app-login']);
      }
      // 檢查 token 是否有權限存取或編輯當前頁面
      const userRole = payload.customRole;
      // detail page的路徑會根據id變化，'app-device-detail/:deviceGuid'
      const allowedPages = [
        '/app-home/app-dashboard',
        '/app-home/app-interactive-map',
        /^\/app-home\/app-device-detail\/[^\/]+$/ // 匹配 /app-home/app-device-detail/ 後面跟著任意非斜杠字符的路徑
      ];
      if (userRole == 'Admin' || userRole == 'Editor') {
        return true;
      } else if (userRole == 'Viewer') {
        const currentPath = route.routeConfig?.path || ''; // 提供預設值
        const isAllowed = allowedPages.some(page => {
          if (typeof page === 'string') {
            return page === currentPath;
          } else if (page instanceof RegExp) {
            return page.test(currentPath);
          }
          return false;
        });
        if (isAllowed) {
          return true;
        } else {
          openSnackBar(_snackBar, '您無權訪問此頁面', '關閉');
          return router.createUrlTree(['app-home/app-dashboard']);
        }
      }
    } catch (error) {
      openSnackBar(_snackBar, '無效的token，請重新登入', '關閉');
      localStorage.clear();
      return router.createUrlTree(['app-login']);
    }
  } else {
    openSnackBar(_snackBar, '尚未登入', '關閉');
    localStorage.clear();
    return router.createUrlTree(['app-login']);
  }
  return true;
};

export const AuthGuardChild: CanActivateChildFn = (childRoute, state) => {
  return AuthGuard(childRoute, state);
};

const openSnackBar = (
  snackBar: MatSnackBar,
  message: string,
  action: string
): void => {
  snackBar.open(message, action, {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 5000,
  });
};
