import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetUnitResponse, INewUnitRequest, INewUnitResponse, unitList } from 'src/app/models/unit-manage';

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

  getUnits(): Observable<IGetUnitResponse<unitList>>{
    const ApiUrl = this.baseUrl + '/DeviceManage/DeviceData/GetDeviceUnitList';
    return this.http.get<IGetUnitResponse<unitList>>(ApiUrl);
  }
}
