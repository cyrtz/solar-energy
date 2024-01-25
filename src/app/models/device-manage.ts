export interface IDeviceResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface deviceList{
    deviceList: deviceListRes[];
}

export interface deviceListRes {
    devName: string;
    devGuid: string;
    batteryPower: string;
    address: string;
    place: string;
    createTime: string;
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