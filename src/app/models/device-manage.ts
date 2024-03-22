export interface IDeviceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}
export interface deviceList {
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
export interface IAddDeviceRequest {
    deviceName: string;
    deviceUnitGuid: string;
    devicePlaceName: string;
    deviceNumber: string;
}
export interface IAddDeviceResponse {
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