import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddDevicePlaceRequest, IAddDevicePlaceResponse, IDeletePlaceRequest, IDeleteUnitRequest, IGetPlaceResponse, IGetTotalUnitPageResponse, IGetUnitResponse, INewUnitRequest, INewUnitResponse, IunitNameisExistsResponse, placeList, unitList } from 'src/app/models/unit-manage';

@Injectable({
  providedIn: 'root'
})
export class UnitManageService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://192.168.50.132:5142';

  addUnit(params: INewUnitRequest): Observable<INewUnitResponse<"">> {
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/AddDeviceUnit';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }
  getUnits(page: number, pageSize:number): Observable<IGetUnitResponse<unitList>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/GetPageDeviceUnitList?page=${page + 1}&pageSize=${pageSize}`;
    return this.http.get<IGetUnitResponse<unitList>>(ApiUrl);
  }
  getTotalUnits(): Observable<IGetUnitResponse<unitList>>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/GetDeviceUnitList';
    return this.http.get<IGetUnitResponse<unitList>>(ApiUrl);
  }
  deleteUnit(params:IDeleteUnitRequest): Observable<INewUnitResponse<"">>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/DeleteDeviceUnit';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }
  getTotalUnitPage(): Observable<IGetTotalUnitPageResponse>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/GetTotalUnitPage';
    return this.http.get<IGetTotalUnitPageResponse>(ApiUrl);
  }
  unitNameisExists(unitName: string): Observable<IunitNameisExistsResponse> {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/GetUnitNameExists?deviceUnitName=${unitName}`;
    return this.http.get<IunitNameisExistsResponse>(ApiUrl);
  }
  addDevicePlace(params: IAddDevicePlaceRequest): Observable<IAddDevicePlaceResponse<"">> {
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/AddDevicePlace';
    return this.http.post<IAddDevicePlaceResponse<"">>(ApiUrl, params);
  }
  getPlaces(): Observable<IGetPlaceResponse<placeList>>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/GetDevicePlaceList';
    return this.http.get<IGetPlaceResponse<placeList>>(ApiUrl);
  }
  searchDevicePlace(deviceUnitGuid: string): Observable<IGetPlaceResponse<placeList>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/SearchDevicePlace?deviceUnitGuid=${deviceUnitGuid}`;
    return this.http.get<IGetPlaceResponse<placeList>>(ApiUrl);
  }
  deletePlace(params:IDeletePlaceRequest): Observable<INewUnitResponse<"">>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/DeleteDevicePlace';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }

}
