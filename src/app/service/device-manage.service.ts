import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DeviceList, IDeviceResponse, INewDeviceRequest, INewDeviceResponse } from '../models/device-manage';

@Injectable({
  providedIn: 'root'
})

export class DeviceManageService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  // 取得設備列表
  getDevices(): Observable<IDeviceResponse<DeviceList[]>>{
    return this.http.get<IDeviceResponse<DeviceList[]>>(this.baseUrl + '/DeviceManage/DeviceManage/GetDeviceInfo');
  }
  // 新增設備
  addDevice(params: INewDeviceRequest): Observable<INewDeviceResponse>{
    return this.http.post<INewDeviceResponse>(this.baseUrl + '/DeviceManage/DeviceManage/AddDevice', params);
  }
}
