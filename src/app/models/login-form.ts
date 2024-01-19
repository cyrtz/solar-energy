export interface ILoginRequest {
    userAccount: string;
    userPassword: string;
}

export interface IApiResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}

export interface IRegisterRequest {
    userAccount: string;
    userPassword: string;
    userPhone: string;
    userEmail: string;
}
