import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        headers: req.headers.set("authorizationToken", "Bearer " + token)
      });
    }
    const started = Date.now();
    return next.handle(req)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const total_time = Date.now() - started;
          console.log(req.urlWithParams + ' 共花費 ' + total_time + 'ms');
          switch (event.body.Status) {
            case 1: {
              event = this.success(event);
              break;
            }
            case 0: {
              event = this.error(event);
              break;
            }
            case -1: {
              event = this.error(event);
              this.router.navigate(['/login']);
              break;
            }
          }
        }
        return event;
      })
    );
  }
  private success(event: any): any {
    if (event.body.Data) {
      return event.clone({ body: event.body.Data });
    } else {
      return event.clone({ body: true });
    }
  }
  private error(event: any): any {
    this.openSnackBar(event.body.Message, '關閉');
    return event.clone({ body: false });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
