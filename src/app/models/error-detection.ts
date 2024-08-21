export interface ITotalPageRes {
    data: number;
    isSuccess: boolean;
    message: string;
}

export interface IErrorListRes<T> {
    data: [];
    isSuccess: boolean;
    message: string;
}

export interface IErrorTypeList {
    errorType: string,
}

export interface IErrorSystemListRes {
    logUser: string,
    logMessage: string,
    userIdentity: string,
    errorType: string,
    errorDetail: string,
    createTime: string,
}

export interface IErrorDeviceListRes {
    deviceName: string,
    deviceUnitName: string,
    devicePlaceName: string,
    deviceMacAddress: string,
    erroType: string,
    errorDetail: string,
    createTime: string,
}