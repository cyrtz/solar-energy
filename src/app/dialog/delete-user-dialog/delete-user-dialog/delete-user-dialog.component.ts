import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteUserRequest, IUserListRes } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {
  // 接收從父元件傳遞的使用者資訊
  userInfo: IUserListRes;

  // 定義一個"關閉事件"發射器
  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: IUserListRes
  ) {
    this.userInfo = data;
  }

  // 刪除設備
  delete(): void {
    // 創建物件 request 並設定 deviceGuid
    const request: IDeleteUserRequest = {
      sysGuid: this.data.sysGuid,
    };

    this.accountService.deleteUser(request)
      .subscribe(
        res => {
          if (res.isSuccess == false) {
            alert(res.message);
            return;
          } else {
            alert('刪除成功');
            this.dialogClosed.emit();
          }
        });
  }
}
