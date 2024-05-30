export interface IAccountResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}
export interface IAccountInfo {
    sysGuid: string
    userGuid: string
    userAccount: string
    userName: string
    userEmail: string
    userPhone: string
    userDepartment: string
    userPosition: string
    lastLoginTime: string
    createTime: string
    updateTime: string
    infoUpdateTime: string
}