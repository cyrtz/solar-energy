export interface INewUnitRequest {
    deviceUnitName: string | null;
}

export interface INewUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IGetUnitResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}