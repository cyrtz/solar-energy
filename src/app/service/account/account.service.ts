import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountInfo, IAccountResponse } from 'src/app/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.132:5142';

  // 取得使用者資訊 interface待修正
  getAccountInfo(): Observable<IAccountResponse<IAccountInfo>>{
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetAccountInfo';
    return this.http.get<IAccountResponse<IAccountInfo>>(ApiUrl)
  }
}
