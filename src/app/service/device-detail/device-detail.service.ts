import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IDeviceData, IDeviceDataResponse, IDeviceDetail, IDeviceDetailResponse } from 'src/app/models/device-detail';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  private baseUrl = 'http://192.168.50.132:5141' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  getDeviceDetail(deviceGuid: string) {
    const url = this.baseUrl + `/DeviceManage/DeviceManage/GetDeviceData?deviceGuid=${deviceGuid}`;
    return this.http.get<IDeviceDetailResponse<IDeviceDetail>>(url);
  }

  getDeviceData(deviceGuid: string) {
    const url = this.baseUrl + `/DeviceManage/DeviceDetail/GetDeviceDetail?deviceGuid=${deviceGuid}`;
    return this.http.get<IDeviceDataResponse<IDeviceData>>(url);
  }
  
}
