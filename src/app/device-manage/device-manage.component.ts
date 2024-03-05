import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';

@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})

export class DeviceManageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['deviceName', 'deviceAddress', 'devicePlace', 'operation'];
  deviceData: deviceListRes[] = [];
  dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
  // 當前頁碼
  currentPage: number = 0;
  totalPage: number = 0;
  constructor(
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
  ) { }

  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;
  // 取得搜尋框
  @ViewChild('filter') filter!: ElementRef;
  currentFilterData!: string;

  ngOnInit(): void {
    this.getDevices(this.currentPage, 6);
    this.getTotalPage();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    if (this.paginator) {
      this.paginator.page.subscribe((page: PageEvent) => {
        this.getDevices(page.pageIndex, page.pageSize);
        this.getTotalPage();
      });
    }
    // 訂閱搜尋框的 keyup 事件
    fromEvent(this.filter.nativeElement, 'input')
      .pipe(
        // 500 毫秒後觸發
        debounceTime(1000),
        // 值改變時觸發
        distinctUntilChanged()
      ).subscribe(() => {
        this.currentFilterData = (this.filter.nativeElement as HTMLInputElement).value;
        this.searchDevice(this.currentFilterData);
      });
  }

  // 取得設備列表
  getDevices(page: number, pageSize: number): void {
    this.deviceService.getDevices(page, pageSize)
      .subscribe(
        res => {
          this.deviceData = res.data.deviceList;
          this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
          if (page === 0) {
            this.currentPage = 0;
          }else {
            this.currentPage = page;
          }
        })
  }
  // 取得總頁數
  getTotalPage(): void {
    this.deviceService.getTotalPage()
    .subscribe(
      res => {
        this.totalPage = res.data;
      }
    )
  }
  // 搜尋設備
  searchDevice(currentFilterData: string): void {
    this.deviceService.searchDevice(currentFilterData as unknown as string)
    .subscribe(
      res => {
        this.deviceData = res.data.deviceList;
        this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
        this.currentPage = 0;
        this.totalPage = this.deviceData.length;
      }
    )
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
      this.getDevices(this.currentPage,6);
      this.getTotalPage();
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
      this.getDevices(this.currentPage,6);
      this.getTotalPage();
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
      this.getDevices(this.currentPage,6);
      this.getTotalPage();
    });
  }
}