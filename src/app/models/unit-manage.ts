export interface INewUnitRequest {
    deviceUnitName: string | null;
}

export interface INewUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IUnitList {
    unitList: IUnitListResponse[];
}

export interface IUnitListResponse {
    Id: number;
    deviceUnitName: string;
    deviceUnitGuid: string;
    devicePlaceName: string;
}

export interface IGetUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IDeleteUnitRequest {
    deviceUnitGuid: string;
}

export interface IDeleteUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IGetTotalUnitPageResponse{
    data: number;
    isSuccess: boolean;
    message: string;
}

export interface IUnitNameisExistsResponse {
    data: boolean;
    isSuccess: boolean;
    message: string;
}

export interface IAddDevicePlaceRequest{
    devicePlaceName: string | null;
    deviceUnitGuid: string;
}

export interface IAddDevicePlaceResponse<T>{
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IPlaceList{
    placeList: IPlaceListItem[];
}

export interface IPlaceListItem{
    Id: number;
    devicePlaceName: string;
    devicePlaceGuid: string;
    deviceUnitGuid: string;
    deviceUnitName: string;
}

export interface IGetPlaceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IDeletePlaceRequest {
    devicePlaceGuid: string;
}

export interface IDeletePlaceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface ISearchDeviceByPlaceRequest {
    devicePlaceGuid: string;
}

export interface ISearchDeviceByPlaceList {
    Id: number;
    deviceGuid: string;
    deviceName: string;
    devicePlaceName: string;
}

export interface ISearchDeviceByPlace {
    searchDeviceByPlaceList: ISearchDeviceByPlaceList[];
}

export interface ISearchDeviceByPlaceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface ISearchDeviceByUnitRequest {
    deviceUnitGuid: string;
}

export interface ISearchDeviceByUnitList {
    Id: number;
    deviceGuid: string;
    deviceName: string;
    devicePlaceName: string;
    devicePlaceGuid: string;
    deviceUnitName: string;
    deviceUnitGuid: string;
}

export interface ISearchDeviceByUnit {
    deviceDataList: ISearchDeviceByUnitList[];
}

export interface ISearchDeviceByUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface ISearchPlaceByUnitRequest {
    deviceUnitGuid: string;
}

export interface ISearchPlaceByUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}