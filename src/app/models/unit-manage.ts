export interface INewUnitRequest {
    deviceUnitName: string | null;
}

export interface INewUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface unitList {
    unitList: unitListResponse[];
}

export interface unitListResponse {
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

export interface IunitNameisExistsResponse {
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