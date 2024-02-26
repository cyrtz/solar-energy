import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, ILoginRequest, IRegisterRequest } from '../../models/login-form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://192.168.50.132:5142';

  login(params: ILoginRequest): Observable<IApiResponse<"">>{
      const ApiUrl = this.baseUrl + '/Account/AccountInfo/Login';
      return this.http.post<IApiResponse<"">>(ApiUrl, params);
  }

  register(params: IRegisterRequest): Observable<IApiResponse<"">>{
    const ApiUrl = this.baseUrl + '/Account/AccountInfo/Register';
    return this.http.post<IApiResponse<"">>(ApiUrl, params);
  }
}
