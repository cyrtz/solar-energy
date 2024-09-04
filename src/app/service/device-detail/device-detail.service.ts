import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IControlBattReq, IControlBattRes, IControlLoadReq, IDeviceDetailRes, IDeviceInfo, IDeviceSunDetailData } from 'src/app/models/device-detail';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api
  private mqttip = '163.17.136.69';
  private mqttPort = 1883;

  constructor(
    private http: HttpClient,
  ) { }

  getDeviceData(macAddress: string) {
    macAddress = macAddress.replace(/:/g, '%3A');
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceDetail/GetDeviceInfo?macAddress=${macAddress}`;
    return this.http.get<IDeviceDetailRes<IDeviceInfo>>(ApiUrl);
  }

  getSunDetailData(macAddress: string, date: string): Observable<IDeviceDetailRes<IDeviceSunDetailData[]>> {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceDetail/GetSunDetailData?macAddress=${macAddress}&getDate=${date}`;
    return this.http.get<IDeviceDetailRes<IDeviceSunDetailData[]>>(ApiUrl);
  }

  getBattPowerData(macAddress: string): Observable<IDeviceDetailRes<number>> {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceDetail/GetBattPowerData?macAddress=${macAddress}`;
    return this.http.get<IDeviceDetailRes<number>>(ApiUrl);
  }
  
  controlBatt(params: IControlBattReq): Observable<IControlBattRes> {
    const ApiUrl = this.baseUrl + `/MQTT/MQTTSetting/ControlBatt`;
    params.mqttIp = this.mqttip;
    params.mqttTopic = 'Sun/State/BattControl';
    params.mqttPort = this.mqttPort;
    return this.http.post<IControlBattRes>(ApiUrl, params);
  }

  controlLoad(params: IControlLoadReq): Observable<IControlBattRes> {
    const ApiUrl = this.baseUrl + `/MQTT/MQTTSetting/ControlLoad`;
    params.mqttIp = this.mqttip;
    params.mqttTopic = 'Sun/State/PowerControl';
    params.mqttPort = this.mqttPort;
    return this.http.post<IControlBattRes>(ApiUrl, params);
  }
}
