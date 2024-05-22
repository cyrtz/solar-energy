import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddDevicePlaceRequest, IAddDevicePlaceResponse, IDeletePlaceRequest, IDeleteUnitRequest, IGetPlaceResponse, IGetTotalUnitPageResponse, IGetUnitResponse, INewUnitRequest, INewUnitResponse, IUnitNameisExistsResponse, IPlaceList, IUnitList, ISearchDeviceByPlaceList, ISearchDeviceByPlace, ISearchDeviceByPlaceRequest, ISearchDeviceByPlaceResponse, ISearchDeviceByUnit, ISearchDeviceByUnitResponse, ISearchPlaceByUnitResponse, IPlaceListItem } from 'src/app/models/unit-manage';

@Injectable({
  providedIn: 'root'
})
export class UnitManageService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'http://192.168.50.132:5142';

  addUnit(params: INewUnitRequest): Observable<INewUnitResponse<"">> {
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Unit/AddDeviceUnit';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }
  getUnits(page: number, pageSize:number): Observable<IGetUnitResponse<IUnitList>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Unit/GetPageDeviceUnitList?page=${page + 1}&pageSize=${pageSize}`;
    return this.http.get<IGetUnitResponse<IUnitList>>(ApiUrl);
  }
  getTotalUnits(): Observable<IGetUnitResponse<IUnitList>>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Unit/GetDeviceUnitList';
    return this.http.get<IGetUnitResponse<IUnitList>>(ApiUrl);
  }
  deleteUnit(params:IDeleteUnitRequest): Observable<INewUnitResponse<"">>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Unit/DeleteDeviceUnit';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }
  getTotalUnitPage(): Observable<IGetTotalUnitPageResponse>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Unit/GetTotalUnitPage';
    return this.http.get<IGetTotalUnitPageResponse>(ApiUrl);
  }
  unitNameisExists(unitName: string): Observable<IUnitNameisExistsResponse> {
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Unit/GetUnitNameExists?deviceUnitName=${unitName}`;
    return this.http.get<IUnitNameisExistsResponse>(ApiUrl);
  }
  addDevicePlace(params: IAddDevicePlaceRequest): Observable<IAddDevicePlaceResponse<"">> {
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Place/AddDevicePlace';
    return this.http.post<IAddDevicePlaceResponse<"">>(ApiUrl, params);
  }
  getPlaces(): Observable<IGetPlaceResponse<IPlaceList>>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Place/GetDevicePlaceList';
    return this.http.get<IGetPlaceResponse<IPlaceList>>(ApiUrl);
  }
  searchDeviceByUnit(deviceUnitGuid: string): Observable<ISearchDeviceByUnitResponse<ISearchDeviceByUnit>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Place/SearchDeviceByUnit?deviceUnitGuid=${deviceUnitGuid}`;
    return this.http.get<ISearchDeviceByUnitResponse<ISearchDeviceByUnit>>(ApiUrl);
  }
  deletePlace(params:IDeletePlaceRequest): Observable<INewUnitResponse<"">>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/Place/DeleteDevicePlace';
    return this.http.post<INewUnitResponse<"">>(ApiUrl, params);
  }
  searchDeviceByPlace(placeGuid: string): Observable<ISearchDeviceByPlaceResponse<ISearchDeviceByPlace>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Place/SearchDeviceByPlace?devicePlaceGuid=${placeGuid}`;
    return this.http.get<ISearchDeviceByPlaceResponse<ISearchDeviceByPlace>>(ApiUrl);
  }
  searchUnit(unitName: string): Observable<IGetUnitResponse<IUnitList>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Unit/?unitName=${unitName}`;
    return this.http.get<IGetUnitResponse<IUnitList>>(ApiUrl);
  }
  searchPlaceByUnit(unitGuid: string): Observable<ISearchPlaceByUnitResponse<IPlaceList>>{
    const ApiUrl = this.baseUrl + `/DeviceManage/DeviceData/Place/SearchPlaceByUnit?deviceUnitGuid=${unitGuid}`;
    return this.http.get<ISearchPlaceByUnitResponse<IPlaceList>>(ApiUrl);
  }

}
