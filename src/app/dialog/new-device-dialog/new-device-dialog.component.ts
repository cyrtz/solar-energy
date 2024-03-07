import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeviceManageService } from '../../service/device-manage/device-manage.service';
import { INewDeviceRequest } from '../../models/device-manage';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent {

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  newDeviceForm = new FormGroup({
    deviceName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_]*$'),
    ]),
    deviceUnitName: new FormControl('', Validators.required),
    devicePlaceName: new FormControl('', Validators.required),
  })

  get deviceName() { return this.newDeviceForm.get('deviceName'); }
  get deviceUnitName() { return this.newDeviceForm.get('deviceUnitName'); }
  get devicePlaceName() { return this.newDeviceForm.get('devicePlaceName'); }
  
  constructor(
    private deviceService: DeviceManageService,
    // public dialog: MatDialog,
  ) { }

  // 新增設備
  add(): void {
    const value = this.newDeviceForm.getRawValue();
    this.deviceService.addDevice(value as unknown as INewDeviceRequest)
    .subscribe(res => {
      console.log(res.message);
      // 發布事件
      this.dialogClosed.emit();
    });
  }
}
