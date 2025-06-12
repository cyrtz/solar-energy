import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountInfo, IAccountResponse, IAccountUpdateRequest, IAccountUpdateResponse, IDeleteUserRequest, IGetDepartmentListRes, INewUserRequest, IUserList, IUserResponse } from 'src/app/models/account';
import { ISearchTotalPageResponse } from 'src/app/models/device-manage';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.248:5142';

  // 取得使用者資訊 
  getAccountInfo(): Observable<IAccountResponse<IAccountInfo>> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetAccountInfo';
    return this.http.get<IAccountResponse<IAccountInfo>>(ApiUrl)
  }
  // 編輯當前使用者資訊
  editAccountInfo(params: IAccountUpdateRequest): Observable<IAccountUpdateResponse> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/UpdateInfo';
    return this.http.post<IAccountUpdateResponse>(ApiUrl, params)
  }
  // 取得行政/教學單位列表
  getDepartmentList(): Observable<IUserResponse<IGetDepartmentListRes>> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetDepartmentList';
    return this.http.get<IUserResponse<IGetDepartmentListRes>>(ApiUrl);
  }

  getUserList(pageIndex: number, pageSize: number): Observable<IUserResponse<IUserList>> {
    const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetAccountInfoList?pageindex=${pageIndex}&pagesize=${pageSize}`;
    return this.http.get<IUserResponse<IUserList>>(ApiUrl);
  }
  // 搜尋會員
  searchUser(userDepartment: string, userName: string, pageIndex: number, pageSize: number): Observable<IUserResponse<IUserList>> {
    if (userDepartment != '') {
      if (userName != '') {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoList?userDepartment=${userDepartment}&userName=${userName}&page=${pageIndex}&pagesize=${pageSize}`;
        return this.http.get<IUserResponse<IUserList>>(ApiUrl);
      } else {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoList?userDepartment=${userDepartment}&pageindex=${pageIndex}&pagesize=${pageSize}`;
        return this.http.get<IUserResponse<IUserList>>(ApiUrl);
      }
    } else {
      const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoList?userName=${userName}&pageindex=${pageIndex}&pagesize=${pageSize}`;
      return this.http.get<IUserResponse<IUserList>>(ApiUrl);
    }
  }
  // 取得總頁數
  getTotalCount(): Observable<ISearchTotalPageResponse> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetAccountInfoTotalPage';
    return this.http.get<ISearchTotalPageResponse>(ApiUrl);
  }
  // 取得搜尋結果的總頁數
  getSearchTotalPage(userDepartment: string, userName: string): Observable<ISearchTotalPageResponse> {
    if (userDepartment != '') {
      if (userName != '') {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoTotalPage?userDepartment=${userDepartment}&userName=${userName}`;
        return this.http.get<ISearchTotalPageResponse>(ApiUrl);
      } else {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoTotalPage?userDepartment=${userDepartment}`;
        return this.http.get<ISearchTotalPageResponse>(ApiUrl);
      }
    } else {
      const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchAccInfoTotalPage?userName=${userName}`;
      return this.http.get<ISearchTotalPageResponse>(ApiUrl);
    }
  }
  // 新增會員
  addUser(params: INewUserRequest): Observable<IUserResponse<string>> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/AddAccount';
    return this.http.post<IUserResponse<string>>(ApiUrl, params);
  }
  // 刪除會員
  deleteUser(userGuid: IDeleteUserRequest): Observable<IUserResponse<string>> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/Delete';
    return this.http.post<IUserResponse<string>>(ApiUrl, userGuid);
  }

  getAccessToken(AuthorizeCode: string): Observable<IAccountResponse<string>> {
    const ApiUrl = this.baseUrl + '/LineNotify/AccessToken';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<IAccountResponse<string>>(ApiUrl, {AuthorizeCode}, {headers});
  }
}
