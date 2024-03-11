import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  getDeviceDetail(deviceGuid: string) {
    // const url = this.baseUrl + `/DeviceManage/DeviceManage/GetDeviceDetail?deviceGuid=${deviceGuid}`;
    // return this.http.get(url);
    return of({
      isSucces: true,
    })
  }
  getDeviceData(deviceGuid: string) {
    // const url = this.baseUrl + `/DeviceManage/DeviceManage/GetDeviceData?deviceGuid=${deviceGuid}`;
    // return this.http.get(url);
    return of({})
  }
}
