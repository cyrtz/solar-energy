import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEditDeviceRequest, deviceListRes } from 'src/app/models/device-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.scss']
})
export class EditDeviceDialogComponent implements OnInit{
  // 接收從父元件傳遞的設備數據
  device: deviceListRes;

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  editDeviceForm = new FormGroup({
    deviceOldName: new FormControl('',[
      Validators.required,
    ]),
    deviceName: new FormControl('',[
      Validators.required,
    ]),
    deviceUnitName: new FormControl('',[
      Validators.required,
    ]),
    devicePlaceName: new FormControl('',[
      Validators.required,
    ]),
  })

  constructor(
    private deviceService: DeviceManageService,
    @Inject(MAT_DIALOG_DATA) public data: deviceListRes
    ) {
      this.device = data;
    }
    ngOnInit(): void {
      this.editDeviceForm.patchValue({
        deviceOldName: this.device.deviceName,
        deviceName: '',
        deviceUnitName: this.device.deviceUnitName,
        devicePlaceName: this.device.devicePlaceName,
      });
    }

  // 編輯設備
  edit(): void {
    // 獲取表單數據
    const value = this.editDeviceForm.getRawValue();
    this.deviceService.editDevice(value as unknown as IEditDeviceRequest)
    .subscribe(res => {
      // console.log(res.message);
      // 發布事件
      this.dialogClosed.emit();
    });
  }

}
