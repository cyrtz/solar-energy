export interface IDeviceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface deviceList{
    deviceList: deviceListRes[];
}

export interface deviceListRes {
    deviceGuid: string;
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
    createTime: string;
    updateTime: string;
}
export interface INewDeviceRequest {
    devName: string;
    address: string;
    place: string;
}
export interface INewDeviceResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
export interface IDeleteDeviceRequest {
    deviceGuid: string;
}
export interface IDeleteDeviceResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
export interface IEditDeviceRequest {
    deviceOldName: string;
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
}
export interface IEditDeviceResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
// export interface ISearchDeviceRequest {
//     deviceName: string;
// }
export interface ITotalPageResponse {
    data: number;
    isSuccess: boolean;
    message: string;
}
export interface ISearchTotalPageResponse {
    data: number;
    isSuccess: boolean;
    message: string;
}
export interface IIsExistsResponse {
    data: boolean;
    isSuccess: boolean;
    message: string;
}
export interface IUnitListResponse {
    value: string;
    viewValue: string;
}