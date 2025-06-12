import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IErrorListRes, IErrorSystemListRes } from 'src/app/models/error-detection';
import {  ITotalPageRes } from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class ErrorSystemService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.248:5142';

  getSystemError(pageIndex: number, pageSize: number): Observable<IErrorListRes<IErrorSystemListRes>> {
    const ApiUrl = this.baseUrl + `///?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<IErrorListRes<IErrorSystemListRes>>(ApiUrl);
  }
  getTotalCount(): Observable<ITotalPageRes> {
    const ApiUrl = this.baseUrl + '';
    return this.http.get<ITotalPageRes>(ApiUrl);
  }
}
