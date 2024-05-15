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
    deviceUnitGuid: string;
    devicePlaceGuid: string;
    createTime: string;
    updateTime: string;
}
export interface IAddDeviceRequest {
    token: string;
    deviceName: string;
    deviceUnitGuid: string;
    devicePlaceGuid: string;
    deviceMacAddress: string;
}
export interface IAddDeviceResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
export interface IDeletedeviceList {
    deviceGuid: string;
    deviceName: string;
    deviceUnitName: string;
    devicePlaceGuid: string;
    devicePlaceName: string;
    createTime: string;
    updateTime: string;
}
export interface IDeleteDeviceRequest {
    token: string;
    deviceGuid: string;
}
export interface IDeleteDeviceResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
export interface IEditDeviceRequest {
    token: string;
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