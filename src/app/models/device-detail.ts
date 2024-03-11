export interface IDeviceDetailResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}
export interface IDeviceDetailRequest {
    deviceGuid: string;
}
export interface IDeviceDetail {
    deviceGuid: string;
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
    createTime: string;
    updateTime: string;
}
export interface IDeviceData {
    batteryPower: number;
    battVoltage: number;
    batteryAmpere: number;
    loadVoltage: number;
    loadAmpere: number;
    co2Reduce: string; 
}