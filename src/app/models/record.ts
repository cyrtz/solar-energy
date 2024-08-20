export interface IAccessList{
    accessLevel: string,
}
export interface IRecordRes<T> {
    data: [IOperateListRes];
    isSuccess: boolean;
    message: string;
}
export interface IOperateListRes{
    logLevel: string,
    logUser: string,
    logMessage: string,
    userIdentity: string,
    createTime: string,
}
export interface ITotalPageRes {
    data: number;
    isSuccess: boolean;
    message: string;
}
// ErrorSystem
export interface IErrorTypeList{
    errorType: string,
}
export interface IErrorSystemListRes{
    logUser: string,
    logMessage: string,
    userIdentity: string,
    createTime: string,
}