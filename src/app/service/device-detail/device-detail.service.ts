import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IControlBattReq, IControlBattRes, IControlLoadReq, IDeviceData, IDeviceDataResponse, IDeviceDetail, IDeviceDetailResponse } from 'src/app/models/device-detail';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  // 沒有該API
  // getDeviceDetail(deviceGuid: string) {
  //   const ApiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetDeviceData?deviceGuid=${deviceGuid}`;
  //   return this.http.get<IDeviceDetailResponse<IDeviceDetail>>(ApiUrl);
  // }

  getDeviceData(macAddress: string) {
    macAddress = macAddress.replace(/:/g, '%3A');
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceDetail/GetDeviceDetail?macAddress=${macAddress}`;
    return this.http.get<IDeviceDataResponse<IDeviceData>>(ApiUrl);
  }
  
  controlBatt(params: IControlBattReq): Observable<IControlBattRes> {
    const ApiUrl = this.baseUrl + `/MQTT/MQTTSetting/ControlBatt`;
    return this.http.post<IControlBattRes>(ApiUrl, params);
  }

  controlLoad(params: IControlLoadReq): Observable<IControlBattRes> {
    const ApiUrl = this.baseUrl + `/MQTT/MQTTSetting/ControlLoad`;
    return this.http.post<IControlBattRes>(ApiUrl, params);
  }
}
