import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountInfo, IAccountResponse, IAccountUpdateRequest, IAccountUpdateResponse } from 'src/app/models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.132:5142';

  // 取得使用者資訊 
  getAccountInfo(): Observable<IAccountResponse<IAccountInfo>>{
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetAccountInfo';
    return this.http.get<IAccountResponse<IAccountInfo>>(ApiUrl)
  }
  // 編輯使用者資訊
  editAccountInfo(params: IAccountUpdateRequest): Observable<IAccountUpdateResponse>{
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/UpdateInfo';
    return this.http.post<IAccountUpdateResponse>(ApiUrl, params)
  }
}
