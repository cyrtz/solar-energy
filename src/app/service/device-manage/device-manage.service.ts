import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDeleteDeviceRequest, IDeleteDeviceResponse, IDeviceResponse, IEditDeviceRequest, IEditDeviceResponse, IIsExistsResponse, INewDeviceRequest, INewDeviceResponse, ISearchTotalPageResponse, ITotalPageResponse, deviceList } from '../../models/device-manage';

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
  // 取得總頁數
  getTotalPage(): Observable<ITotalPageResponse> {
    const url = this.baseUrl + '/DeviceManage/DeviceManage/GetTotalPage';
    return this.http.get<ITotalPageResponse>(url);
  }
  // 新增設備
  addDevice(params: INewDeviceRequest): Observable<INewDeviceResponse> {
    const url = this.baseUrl + '/DeviceManage/DeviceManage/AddDevice';
    return this.http.post<INewDeviceResponse>(url, params);
  }
  // 刪除設備
  deleteDevice(params: IDeleteDeviceRequest): Observable<IDeleteDeviceResponse> {
    const url = this.baseUrl + '/DeviceManage/DeviceManage/DeleteDevice';
    return this.http.post<INewDeviceResponse>(url, params);
  }
  // 編輯設備
  editDevice(params: IEditDeviceRequest): Observable<IEditDeviceResponse> {
    const url = this.baseUrl + '/DeviceManage/DeviceManage/UpdateDevice';
    return this.http.post<IEditDeviceResponse>(url, params);
  }
  // 搜尋設備
  searchDevice(deviceName: string, page: number, pageSize: number): Observable<IDeviceResponse<deviceList>> {
    const url = this.baseUrl + `/DeviceManage/DeviceManage/SearchDeviceList?deviceName=${deviceName}&page=${page + 1}&pageSize=${pageSize}`;
    return this.http.get<IDeviceResponse<deviceList>>(url);
  }
  getSearchTotalPage(deviceName: string): Observable<ISearchTotalPageResponse> {
    const url = this.baseUrl + `/DeviceManage/DeviceManage/GetSearchTotalPage?deviceName=${deviceName}`;
    return this.http.get<ISearchTotalPageResponse>(url);
  }
  isExists(deviceName: string): Observable<IIsExistsResponse> {
    const url = this.baseUrl + `/DeviceManage/DeviceManage/GetNameExists?deviceName=${deviceName}`;
    return this.http.get<IIsExistsResponse>(url);
  }
}
