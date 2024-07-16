export interface IDeviceDetailRequest {
    deviceGuid: string;
}

export interface IDeviceDetailResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IDeviceDetail {
    deviceGuid: string;
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
    createTime: string;
    updateTime: string;
}

export interface IDeviceDataResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IDeviceData {
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
    battPower: number;
    battVoltage: number;
    battAmpere: number;
    loadVoltage: number;
    loadAmpere: number;
    co2Reduce: string;
}
export interface IControlBattReq {
    macAddress: string
    battState: string
    mqttIp: string
    mqttPort: number
    mqttTopic: string
}
export interface IControlBattRes {
    data: string
    isSuccess: boolean
    message: string
}
export interface IControlLoadReq {
    macAddress: string
    loadState1: string
    loadState2: string
    mqttIp: string
    mqttPort: number
    mqttTopic: string
}