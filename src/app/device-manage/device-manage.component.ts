import { Component, OnInit } from '@angular/core';
import { deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage.service';
import { NewDeviceDialogComponent } from '../new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})

export class DeviceManageComponent implements OnInit {

  // displayedColumns: string[] = ['devName', 'address', 'place', 'batteryPower', 'operation'];
  displayedColumns: string[] = ['devName', 'address', 'place', 'operation'];
  deviceData: deviceListRes[] = [];
  dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);

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
    .subscribe(
      res => {
        this.deviceData = res.data.deviceList;
        this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
      })
  }
  // 開啟新增設備視窗
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getDevices();
    });
  }

}
