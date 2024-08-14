import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IDeleteDeviceRequest, IDeletedeviceList } from 'src/app/models/device-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';

@Component({
  selector: 'app-delete-device-dialog',
  templateUrl: './delete-device-dialog.component.html',
  styleUrls: ['./delete-device-dialog.component.scss']
})
export class DeleteDeviceDialogComponent {
  // 接收從父元件傳遞的設備數據
  device: IDeletedeviceList;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // 定義一個"關閉事件"發射器
  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private deviceService: DeviceManageService,
    @Inject(MAT_DIALOG_DATA) public data: IDeletedeviceList,
    private _snackBar: MatSnackBar,
  ) {
    this.device = data;
    // this.devicePlaceName = data.devicePlaceName;
  }

  // 刪除設備
  delete(): void {
    // 創建物件 request 並設定 deviceGuid
    const request: IDeleteDeviceRequest = {
      deviceGuid: this.device.deviceGuid,
    };

    this.deviceService.deleteDevice(request)
      .subscribe(
        res => {
          if (res.isSuccess == false) {
            // 新增失敗訊息
            this.openSnackBar('刪除失敗');
            return;
          } else {
            // 新增刪除成功訊息
            this.openSnackBar('刪除成功');
            // 發布事件
            this.dialogClosed.emit();
          }
        });
  }
  openSnackBar(message: string): void {
    this._snackBar.open(message, '關閉', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
