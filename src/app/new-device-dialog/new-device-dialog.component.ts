import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DeviceManageService } from '../service/device-manage.service';
import { INewDeviceRequest } from '../models/device-manage';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent {

  // 定義一個事件發布器
  @Output() dialogClosed = new EventEmitter<void>();

  newDeviceForm = new FormGroup({
    devName: new FormControl(''),
    address: new FormControl(''),
    place: new FormControl(''),
  })

  constructor(
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
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
