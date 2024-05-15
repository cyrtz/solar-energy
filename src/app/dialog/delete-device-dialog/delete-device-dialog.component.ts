import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  devicePlaceName!: string;

  // 定義一個"關閉事件"發射器
  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private deviceService: DeviceManageService,
    @Inject(MAT_DIALOG_DATA) public data: IDeletedeviceList
  ) {
    this.device = data;
    this.devicePlaceName = data.devicePlaceName;
  }

  // 刪除設備
  delete(): void {
    // 創建物件 request 並設定 deviceGuid
    const request: IDeleteDeviceRequest = {
      token: localStorage.getItem('token') || '',
      deviceGuid: this.device.deviceGuid,
    };

    this.deviceService.deleteDevice(request)
      .subscribe(
        res => {
          // 使用dialog做回應
          console.log(res);
          // dialogClosed 事件觸發時重新取得設備列表
          this.dialogClosed.emit();
          // 發布 dialogClosed 事件
        }
      );
  }
}
