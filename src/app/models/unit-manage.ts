export interface INewUnitRequest {
    deviceUnitName: string | null;
}

export interface INewUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface unitList{
    unitList: unitListResponse[];
}

export interface unitListResponse {
    deviceUnitName: string;
    deviceUnitGuid: number;
}

export interface IGetUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}