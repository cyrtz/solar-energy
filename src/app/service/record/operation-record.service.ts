import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  IOperateListRes, IRecordRes, ITotalPageRes } from 'src/app/models/record';

@Injectable({
  providedIn: 'root'
})
export class OperationRecordService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.132:5142';

  getOperates(pageIndex: number, pageSize: number): Observable<IRecordRes<IOperateListRes>> {
    const ApiUrl = this.baseUrl + `/Log/Logger/GetLog?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<IRecordRes<IOperateListRes>>(ApiUrl);
  }
  getTotalCount(): Observable<ITotalPageRes> {
    const ApiUrl = this.baseUrl + '/Log/Logger/GetLogTotalCount';
    return this.http.get<ITotalPageRes>(ApiUrl);
  }
  searchOperates(userIdentity: string, logUser: string, pageIndex: number, pageSize: number): Observable<IRecordRes<IOperateListRes>> {
    if(userIdentity != '') {
      if(logUser != '') {
        const ApiUrl = this.baseUrl + `/Log/Logger/SearchLog?userIdentity=${userIdentity}&logUser=${logUser}&page=${pageIndex}&pagesize=${pageSize}`;
        return this.http.get<IRecordRes<IOperateListRes>>(ApiUrl);
      }else {
        const ApiUrl = this.baseUrl + `/Log/Logger/SearchLog?userIdentity=${userIdentity}&pageindex=${pageIndex}&pagesize=${pageSize}`;
        return this.http.get<IRecordRes<IOperateListRes>>(ApiUrl);
      }
    }else {
      const ApiUrl = this.baseUrl + `/Log/Logger/SearchLog?logUser=${logUser}&pageindex=${pageIndex}&pagesize=${pageSize}`;
      return this.http.get<IRecordRes<IOperateListRes>>(ApiUrl);
    }
  }
  getSearchTotalPage(userIdentity: string, logUser: string): Observable<ITotalPageRes> {
    if(userIdentity != '') {
      if(logUser != '') {
        const ApiUrl = this.baseUrl + `/Log/Logger/SearchLogCount?userIdentity=${userIdentity}&logUser=${logUser}`;
        return this.http.get<ITotalPageRes>(ApiUrl);
      }else {
        const ApiUrl = this.baseUrl + `/Log/Logger/SearchLogCount?userIdentity=${userIdentity}`;
        return this.http.get<ITotalPageRes>(ApiUrl);
      }
    }else {
      const ApiUrl = this.baseUrl + `/Log/Logger/SearchLogCount?logUser=${logUser}`;
      return this.http.get<ITotalPageRes>(ApiUrl);
    }
  }
}
