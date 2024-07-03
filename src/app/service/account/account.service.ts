import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccountInfo, IAccountResponse, IAccountUpdateRequest, IAccountUpdateResponse, INewUserRequest, IUserList, IUserResponse } from 'src/app/models/account';
import { ISearchTotalPageResponse } from 'src/app/models/device-manage';

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
  // 編輯當前使用者資訊
  editAccountInfo(params: IAccountUpdateRequest): Observable<IAccountUpdateResponse>{
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/UpdateInfo';
    return this.http.post<IAccountUpdateResponse>(ApiUrl, params)
  }
  // 取得部門列表(無功能)
  getDepartmentList(): Observable<any> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/GetDepartmentList';
    return this.http.get(ApiUrl);
  }
  // 取得會員列表 尚未修改成後端分頁（pageIndex與pageSize）
  getUserList(userAccount: string,userIdentity: string,pageIndex: number, pageSize: number): Observable<IUserResponse<IUserList>> {
    const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetAccountInfoList?userAccount=${userAccount}&userIdentity=${userIdentity}`;
    return this.http.get<IUserResponse<IUserList>>(ApiUrl);
  }
  // 搜尋會員(無功能)
  searchUser(userDepartment: string, userName: string, pageIndex: number, pageSize: number): Observable<IUserResponse<IUserList>> {
    if(userDepartment != '') {
      if(userName != '') {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/SearchUserList?userDepartment=${userDepartment}&userName=${userName}&page=${pageIndex + 1}&pageSize=${pageSize}`;
        return this.http.get<IUserResponse<IUserList>>(ApiUrl);
      }else {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/SearchUserList?userDepartment=${userDepartment}&page=${pageIndex + 1}&pageSize=${pageSize}`;
        return this.http.get<IUserResponse<IUserList>>(ApiUrl);
      }
    }else {
      const ApiUrl = this.baseUrl + `/Account/AccountInfo/SearchUserList?userName=${userName}&page=${pageIndex + 1}&pageSize=${pageSize}`;
      return this.http.get<IUserResponse<IUserList>>(ApiUrl);
    }
  }
  // 取得總頁數(無功能)
  getTotalCount(): Observable<ISearchTotalPageResponse> {
    const ApiUrl = this.baseUrl + '';
    return this.http.get<ISearchTotalPageResponse>(ApiUrl);
  }
  // 取得搜尋總頁數(無功能)
  getSearchTotalPage(userDepartment: string, userName: string): Observable<ISearchTotalPageResponse> {
    if(userDepartment != '') {
      if(userName != '') {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchTotalPage?userDepartment=${userDepartment}&userName=${userName}`;
        return this.http.get<ISearchTotalPageResponse>(ApiUrl);
      }else {
        const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchTotalPage?userDepartment=${userDepartment}`;
        return this.http.get<ISearchTotalPageResponse>(ApiUrl);
      }
    }else {
      const ApiUrl = this.baseUrl + `/Account/AccountInfo/GetSearchTotalPage?userName=${userName}`;
      return this.http.get<ISearchTotalPageResponse>(ApiUrl);
    }
  }
  // 新增會員
  addUser(params: INewUserRequest): Observable<IUserResponse<string>> {
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/AddViewer';
    return this.http.post<IUserResponse<string>>(ApiUrl, params);
  }
}
