import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  // GetToken() {
  //   if (localStorage.getItem("token") == null) {
  //     this.router.navigate(["回首頁"])
  //   } 
    // else {
    //   var token = localStorage.getItem("token")
      // 解析 token exp 判斷是否過期 = diff
      // if(!diff) this.Refresh()
    // }
    // return { "authorizationToken": "Bearer " + localStorage.getItem('token') }
  // }

  // Refresh() {
  //   var input = {
  //     RefreshToken: localStorage.getItem("refresh_token")
  //   }
  //   this.api.getRefreshToken(input).then(
  //     res => {
  //       if (res.data.Check) {
  //         localStorage.setItem("token", res.data.access_token!)
  //         localStorage.setItem("refresh_token", res.data.refresh_token!)
  //       } else {
  //         this.createNotification(2, "獲取 Token 失敗")
  //         this.router.navigate(['回首頁'])
  //       }
  //     },
  //     err => {
  //       console.log(err);
  //       this.router.navigate(['回首頁'])
  //     }
  //   )
  // }

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
    return next.handle(req)
    .pipe(
      map(event => {
        if (event instanceof HttpResponse) {
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
    alert(event.body.Message);

    return event.clone({ body: false });
  }
}
