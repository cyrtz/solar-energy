import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DeviceList, IDeviceResponse } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage.service';
import { NewDeviceDialogComponent } from '../new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})

export class DeviceManageComponent implements OnInit {

  displayedColumns: string[] = ['devName', 'address', 'place', 'batteryPower'];
  devices_data: DeviceList[] = [];

  constructor(
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDevices();
  }

  // 取得設備列表
  getDevices(): void {
    this.deviceService.getDevices()
      .subscribe(res => this.devices_data = res.data)
  }
  // 開啟新增設備視窗
  openDialog(
    enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NewDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });

  }
}
