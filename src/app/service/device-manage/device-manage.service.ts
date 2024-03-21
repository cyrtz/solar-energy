import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAddDeviceRequest, IAddDeviceResponse, IDeleteDeviceRequest, IDeleteDeviceResponse, IDeviceResponse, IEditDeviceRequest, IEditDeviceResponse, IIsExistsResponse, ISearchTotalPageResponse, ITotalPageResponse, deviceList } from '../../models/device-manage';

@Injectable({
  providedIn: 'root'
})

export class DeviceManageService {
  [x: string]: any;

  private baseUrl = 'http://192.168.50.132:5142' // URL to web api

  constructor(
    private http: HttpClient,
  ) { }

  // 取得設備列表
  getDevices(pageIndex: number, pageSize: number): Observable<IDeviceResponse<deviceList>> {
    // 使用字符串插值：可以正常執行
    const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetPageDeviceList?page=${pageIndex + 1}&pageSize=${pageSize}`;
    // 使用字符串拼接：不能正常執行
    // const apiUrl = this.baseUrl + '/DeviceManage/DeviceManage/GetPageDeviceList?page='+ pageIndex+1 +'&pageSize='+ pageSize;
    return this.http.get<IDeviceResponse<deviceList>>(apiUrl);
    // return of({'isSuccess':true});
  }
  // 取得總頁數
  getTotalPage(): Observable<ITotalPageResponse> {
    const apiUrl = this.baseUrl + '/DeviceManage/DeviceManage/GetTotalPage';
    return this.http.get<ITotalPageResponse>(apiUrl);
  }
  // 新增設備
  addDevice(params: IAddDeviceRequest): Observable<IAddDeviceResponse> {
    const apiUrl = this.baseUrl + '/DeviceManage/DeviceManage/AddDeviceInfo';
    return this.http.post<IAddDeviceResponse>(apiUrl, params);
  }
  // 刪除設備
  deleteDevice(params: IDeleteDeviceRequest): Observable<IDeleteDeviceResponse> {
    const apiUrl = this.baseUrl + '/DeviceManage/DeviceManage/DeleteDeviceInfo';
    return this.http.post<IAddDeviceResponse>(apiUrl, params);
  }
  // 編輯設備
  editDevice(params: IEditDeviceRequest): Observable<IEditDeviceResponse> {
    const apiUrl = this.baseUrl + '/DeviceManage/DeviceManage/UpdateDeviceInfo';
    return this.http.post<IEditDeviceResponse>(apiUrl, params);
  }
  // 搜尋設備
  searchDevice(deviceUnitGuid: string, deviceName: string, page: number, pageSize: number): Observable<IDeviceResponse<deviceList>> {
    if(deviceUnitGuid != '') {
      if(deviceName != '') {
        const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/SearchDeviceList?deviceUnitGuid=${deviceUnitGuid}&deviceName=${deviceName}&page=${page + 1}&pageSize=${pageSize}`;
        return this.http.get<IDeviceResponse<deviceList>>(apiUrl);
      }else {
        const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/SearchDeviceList?deviceUnitGuid=${deviceUnitGuid}&page=${page + 1}&pageSize=${pageSize}`;
        return this.http.get<IDeviceResponse<deviceList>>(apiUrl);
      }
    }else {
      const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/SearchDeviceList?deviceName=${deviceName}&page=${page + 1}&pageSize=${pageSize}`;
      return this.http.get<IDeviceResponse<deviceList>>(apiUrl);
    };
  }
  // 取得搜尋總頁數
  getSearchTotalPage(deviceUnitGuid: string,deviceName: string): Observable<ISearchTotalPageResponse> {
    if(deviceUnitGuid != '') {
      if(deviceName != '') {
        const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetSearchTotalPage?deviceUnitGuid=${deviceUnitGuid}&deviceName=${deviceName}`;
        return this.http.get<ISearchTotalPageResponse>(apiUrl);

      }else {
        const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetSearchTotalPage?deviceUnitGuid=${deviceUnitGuid}`;
        return this.http.get<ISearchTotalPageResponse>(apiUrl);
      }
    }else {
      const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetSearchTotalPage?deviceName=${deviceName}`;
      return this.http.get<ISearchTotalPageResponse>(apiUrl);
    };
  }
  isExists(deviceName: string): Observable<IIsExistsResponse> {
    const apiUrl = this.baseUrl + `/DeviceManage/DeviceManage/GetNameExists?deviceName=${deviceName}`;
    return this.http.get<IIsExistsResponse>(apiUrl);
  }
}
