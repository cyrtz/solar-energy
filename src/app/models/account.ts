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
export interface IAccountUpdateRequest {
    sysGuid: string
    userEmail: string
    userPhone: string
}
export interface IAccountUpdateResponse {
    data: string;
    isSuccess: boolean;
    message: string;
}
export interface IUserResponse<T> {
    data: T;
    isSuccess: boolean;
    message: string;
}
export interface IUserList {
    userList: IUserListRes[];
}
export interface IUserListRes {
    sysGuid: string
    userGuid: string
    userAccount: string
    userName: string
    userEmail: string
    userPhone: string
    userDepartment: string
    userPosition: string
    userIdentity: string
    lastLoginTime: string
    createTime: string
    updateTime: any
    infoUpdateTime: string
}
export interface IDepartmentListResponse {
    departmentGuid: string
    departmentName: string
}
export interface INewUserRequest {
    userAccount: string
    userPassword: string
    userName: string
    userDepartment: string
    userPosition: string
    userIdentity: string
}
export interface IDeleteUserRequest {
    sysGuid: string;
}