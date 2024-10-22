import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IDeleteUserRequest, IUserListRes } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  userInfo: IUserListRes;
  constructor(
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IUserListRes,
  ) {
    this.userInfo = data;
  }
  
  @Output() dialogClosed = new EventEmitter<void>();
  // 刪除設備
  delete(): void {
    // 創建物件 request 並設定 deviceGuid
    const request: IDeleteUserRequest = {
      sysGuid: this.data.sysGuid,
    };

    this.accountService.deleteUser(request)
      .subscribe(
        res => {
          if (res.isSuccess == true) {
            this.openSnackBar('刪除成功', '關閉');
            this.dialogClosed.emit();
          } else {
            this.openSnackBar(res.message, '關閉');
            this.dialogClosed.emit();
          }
        });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
