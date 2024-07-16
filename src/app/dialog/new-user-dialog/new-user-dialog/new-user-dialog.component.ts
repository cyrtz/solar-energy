import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentList, INewUserRequest } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit{
  // 使用者權限選項
  userRoleListForAdmin = ['Editor', 'Viewer'];
  userRoleListForEditor = ['Viewer'];
  // 目前使用者的權限
  token = localStorage.getItem('token');
  tokenPayload = this.token ? JSON.parse(window.atob(this.token.split('.')[1])) : null;
  currentUserRole = this.tokenPayload.customRole;
  // 使用者行政/教學單位選項
  userDepartmentList : DepartmentList[] = [];
  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();
  // 新增使用者表單
  newUserForm = new FormGroup({
    userAccount: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    userPassword: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    userName: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    userDepartment: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    userPosition: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    userIdentity: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  })
  // 取得表單的值
  get userAccount() { return this.newUserForm.get('userAccount'); }
  get userPassword() { return this.newUserForm.get('userPassword'); }
  get userName() { return this.newUserForm.get('userName'); }
  get userDepartment() { return this.newUserForm.get('userDepartment'); }
  get userPosition() { return this.newUserForm.get('userPosition'); }
  get userIdentity() { return this.newUserForm.get('userIdentity'); }

  constructor(
    private accountService: AccountService,
  ) { }
  ngOnInit(): void {
    this.getDepartmentList();
  }
  // 新增使用者
  addUser(): void {
    const value = this.newUserForm.getRawValue();
    this.accountService.addUser(value as unknown as INewUserRequest)
      .subscribe(res => {
        if (res.isSuccess == true) {
          alert('新增成功');
          this.dialogClosed.emit();
        } else {
          alert(res.message);
          return;
        }
      });
  }
  // 取得行政/教學列表
  getDepartmentList(): void {
    this.accountService.getDepartmentList()
      .subscribe(res => {
        this.userDepartmentList = res.data.departmentList;
      });
  }
  // 根據當前用戶的角色返回相應的角色列表
  get userRoleList() {
    if (this.currentUserRole === 'Admin') {
      return this.userRoleListForAdmin;
    } else if (this.currentUserRole === 'Editor') {
      return this.userRoleListForEditor;
    }
    return []; 
  }
}
