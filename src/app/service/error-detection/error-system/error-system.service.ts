import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IErrorSystemListRes, IRecordRes, ITotalPageRes } from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class ErrorSystemService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.132:5142';

  getOperates(pageIndex: number, pageSize: number): Observable<IRecordRes<IErrorSystemListRes>> {
    const ApiUrl = this.baseUrl + `///?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<IRecordRes<IErrorSystemListRes>>(ApiUrl);
  }
  getTotalCount(): Observable<ITotalPageRes> {
    const ApiUrl = this.baseUrl + '';
    return this.http.get<ITotalPageRes>(ApiUrl);
  }
}
