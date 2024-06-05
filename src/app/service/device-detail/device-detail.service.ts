import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IDeviceData, IDeviceDataResponse, IDeviceDetail, IDeviceDetailResponse } from 'src/app/models/device-detail';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  getDeviceDetail(deviceGuid: string) {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetDeviceData?deviceGuid=${deviceGuid}`;
    return this.http.get<IDeviceDetailResponse<IDeviceDetail>>(ApiUrl);
  }

  getDeviceData(deviceGuid: string) {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceDetail/GetDeviceDetail?deviceGuid=${deviceGuid}`;
    return this.http.get<IDeviceDataResponse<IDeviceData>>(ApiUrl);
  }
  
}
