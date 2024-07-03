import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewUserRequest } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit{
  // 會員權限選項
  userRoleList = ['Editor', 'Viewer'];
  // 會員部門選項
  userDepartmentList = ['人事部', '會計部', '行政部', '研發部', '業務部', '行銷部'];
  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();
  // 新增會員表單
  newUserForm = new FormGroup({
    userAccount: new FormControl('', {
      validators: [
        Validators.required,
      ],
      // asyncValidators: [
      //   this.validate.bind(this),
      //   this.cannotEmpty.bind(this),
      // ],
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
  get userPassword() { return this.newUserForm.get('userAccount'); }
  get userName() { return this.newUserForm.get('userName'); }
  get userDepartment() { return this.newUserForm.get('userDepartment'); }
  get userPosition() { return this.newUserForm.get('userPosition'); }
  get userIdentity() { return this.newUserForm.get('userIdentity'); }

  constructor(
    private accountService: AccountService,
  ) { }
  ngOnInit(): void {
  }
  // 新增會員
  addUser(): void {
    const value = this.newUserForm.getRawValue();
    this.accountService.addUser(value as unknown as INewUserRequest)
      .subscribe(res => {
        if (res.isSuccess == false) {
          alert(res.message);
          return;
        } else {
          alert('新增成功');
          this.dialogClosed.emit();
        }
      });
  }

}
