import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDeleteDeviceRequest, IDeleteDeviceResponse, IDeviceResponse, IEditDeviceRequest, IEditDeviceResponse, INewDeviceRequest, INewDeviceResponse, ITotalPageResponse, deviceList } from '../../models/device-manage';

@Injectable({
  providedIn: 'root'
})

export class DeviceManageService {

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  // 取得設備列表
  getDevices(pageIndex: number, pageSize: number): Observable<IDeviceResponse<deviceList>> {
    // 使用字符串插值：可以正常執行
    const url = this.baseUrl + `/DeviceManage/DeviceManage/GetPageDeviceList?page=${pageIndex + 1}&pageSize=${pageSize}`;
    // 使用字符串拼接：不能正常執行
    // const url = this.baseUrl + '/DeviceManage/DeviceManage/GetPageDeviceList?page='+ pageIndex+1 +'&pageSize='+ pageSize;
    return this.http.get<IDeviceResponse<deviceList>>(url);
  }
  getTotalPage(): Observable<ITotalPageResponse> {
    return this.http.get<ITotalPageResponse>(this.baseUrl + '/DeviceManage/DeviceManage/GetTotalPage');
  }
  // 新增設備
  addDevice(params: INewDeviceRequest): Observable<INewDeviceResponse> {
    return this.http.post<INewDeviceResponse>(this.baseUrl + '/DeviceManage/DeviceManage/AddDevice', params);
  }
  // 刪除設備
  deleteDevice(params: IDeleteDeviceRequest): Observable<IDeleteDeviceResponse> {
    return this.http.post<INewDeviceResponse>(this.baseUrl + '/DeviceManage/DeviceManage/DeleteDevice', params);
  }
  // 編輯設備
  editDevice(params: IEditDeviceRequest): Observable<IEditDeviceResponse> {
    return this.http.post<IEditDeviceResponse>(this.baseUrl + '/DeviceManage/DeviceManage/UpdateDevice', params);
  }
  // 搜尋設備
    searchDevice(params: string): Observable<IDeviceResponse<deviceList>> {
    const url = this.baseUrl + `/DeviceManage/DeviceManage/SearchDeviceList?deviceName=${params}`;
    return this.http.post<IDeviceResponse<deviceList>>(url, params);
  }
}
