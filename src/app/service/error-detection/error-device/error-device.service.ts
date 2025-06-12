import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IErrorDeviceListRes, IErrorListRes } from 'src/app/models/error-detection';

@Injectable({
  providedIn: 'root'
})
export class ErrorDeviceService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.248:5142';

  getDeviceError(pageIndex: number, pageSize: number): Observable<IErrorListRes<IErrorDeviceListRes>> {
    const ApiUrl = this.baseUrl + `///?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<IErrorListRes<IErrorDeviceListRes>>(ApiUrl);
  }

  getTotalCount(): Observable<any> {
    const ApiUrl = this.baseUrl + '';
    return this.http.get<any>(ApiUrl);
  }
}
