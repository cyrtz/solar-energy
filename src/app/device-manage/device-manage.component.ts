import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manager/device-manage.service';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})

export class DeviceManageComponent implements OnInit, AfterViewInit {
  // displayedColumns: string[] = ['deviceName', 'deviceAddress', 'devicePlace', 'batteryPower', 'operation'];
  displayedColumns: string[] = ['deviceName', 'deviceAddress', 'devicePlace', 'operation'];
  deviceData: deviceListRes[] = [];
  dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
  constructor(
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
  ) { }

  // 取得搜尋框
  @ViewChild('filter') filter!: ElementRef;
  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;
  // 取得排序
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getDevices(0, 6);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.page.subscribe((page: PageEvent) => {
        this.getDevices(page.pageIndex, page.pageSize);
      });
    }
    this.dataSource.sort = this.sort;
    // 訂閱搜尋框的 keyup 事件
    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        // 500 毫秒後觸發
        debounceTime(500),
        // 值改變時觸發
        distinctUntilChanged()
      ).subscribe(() => {
        // 設定過濾器，過濾 deviceName
        this.dataSource.filterPredicate = (data: deviceListRes, filter: string): boolean => {
          return data.deviceName.indexOf(filter) !== -1;
        }
        // 搜尋框的值改變時，套用過濾器
        this.dataSource.filter = (this.filter.nativeElement as HTMLInputElement).value;
      });
  }

  // 取得設備列表
  getDevices(page: number, pageSize: number): void {
    this.deviceService.getDevices(page, pageSize)
      .subscribe(
        res => {
          this.deviceData = res.data.deviceList;
          this.deviceData.forEach(device => {
            device.deviceGuid = device.deviceGuid;
          });
          this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
          // 在資料載入後設定 paginator
          // 從後端取得資料時，就不用指定data srouce的paginator了
          // this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }
  // 開啟新增設備對話框
  newDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getDevices(1,6);
    });
  }
  // 開啟刪除設備對話框
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, device: deviceListRes): void {
    const dialogRef = this.dialog.open(DeleteDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: device,
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getDevices(1,6);
    });
  }
  // 開啟編輯設備對話框
  editDialog(enterAnimationDuration: string, exitAnimationDuration: string, device: deviceListRes): void {
    const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: device,
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getDevices(1,6);
    });
  }
}