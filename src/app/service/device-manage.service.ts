import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDeviceResponse, INewDeviceRequest, INewDeviceResponse, deviceList } from '../models/device-manage';

@Injectable({
  providedIn: 'root'
})

export class DeviceManageService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  // 取得設備列表
  getDevices(): Observable<IDeviceResponse<deviceList>>{
    const url = this.baseUrl + '/DeviceManage/DeviceManage/GetDeviceList';
    return this.http.get<IDeviceResponse<deviceList>>(url);
  }
  // 新增設備
  addDevice(params: INewDeviceRequest): Observable<INewDeviceResponse>{
    return this.http.post<INewDeviceResponse>(this.baseUrl + '/DeviceManage/DeviceManage/AddDevice', params);
  }
}
