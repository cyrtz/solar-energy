export interface IDeviceDetailReq {
    deviceGuid: string;
}

export interface IDeviceDetailRes<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IDeviceInfo {
    deviceName: string;
    deviceUnitName: string;
    devicePlaceName: string;
}

export interface IDeviceSunDetailData {
    dataV: number;
    dataA: number;
    dataW: number;
    battState: number;
    createTime: string;
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