import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUnitListResponse, deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { debounceTime, delay, distinctUntilChanged, fromEvent } from 'rxjs';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';
@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})

export class DeviceManageComponent implements OnInit {
  displayedColumns: string[] = ['deviceName', 'deviceUnitName', 'devicePlaceName', 'operation'];
  deviceData: deviceListRes[] = [];
  dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
  isSearch: boolean = false;
  currentFilterData!: string;
  searchInput: string = '';
  currentPage: number = 0;
  totalPage: number = 0;
  unitsNameList: IUnitListResponse[] = [
    { value: '中科大', viewValue: '中科大' },
    { value: '新大', viewValue: '新大' },
    { value: '舊大', viewValue: '舊大' },
  ];

  constructor(
    private deviceService: DeviceManageService,
    public dialog: MatDialog,
  ) { }

  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;
  // 取得搜尋框
  @ViewChild('filter') set filterElement(filter: ElementRef) {
    if (filter) {
      // 訂閱搜尋框的 input 事件
      fromEvent(filter.nativeElement, 'input')
        .pipe(
          debounceTime(1000),
        ).subscribe(() => {
          this.currentFilterData = this.searchInput;
          if (this.currentFilterData.trim() != '') {
            this.searchDevice(this.currentFilterData.trim(), 0, 6);
            this.getSearchTotalPage(this.currentFilterData.trim());
          } else {
            this.isSearch = false;
            this.getDevices(0, 6);
            this.getTotalPage();
          }
        });
    }
  }

  ngOnInit(): void {
    this.getDevices(this.currentPage, 6);
    this.getTotalPage();
  }

  // 取得設備列表
  getDevices(page: number, pageSize: number): void {
    if (this.isSearch) {
      this.searchDevice(this.currentFilterData, page, pageSize);
      this.getSearchTotalPage(this.currentFilterData);
    } else {
      (this.deviceService.getDevices(page, pageSize)
        .subscribe(
          res => {
            this.deviceData = res.data.deviceList;
            this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
            if (page === 0) {
              this.currentPage = 0;
            } else {
              this.currentPage = page;
            }
          }))
    }
  }
  // 取得總頁數
  getTotalPage(): void {
    if (this.isSearch) {
      this.getSearchTotalPage(this.currentFilterData);
    } else
      this.deviceService.getTotalPage()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
  }
  // 搜尋設備
  searchDevice(currentFilterData: string, page: number, pageSize: number): void {
    this.isSearch = true;
    this.deviceService.searchDevice(currentFilterData, page, pageSize)
      .subscribe(
        res => {
          this.deviceData = res.data.deviceList;
          this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
          this.currentPage = 0;
        }
      )
  }
  // 取得搜尋總頁數
  getSearchTotalPage(currentFilterData: string): void {
    this.deviceService.getSearchTotalPage(currentFilterData)
      .subscribe(
        res => {
          this.totalPage = res.data;
          // this.searchTotalPage = res.data;
        }
      )
  }
  // 分頁事件
  onPageChange(event: PageEvent): void {
    this.getDevices(event.pageIndex, event.pageSize);
    this.getTotalPage();
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
      this.getDevices(this.currentPage, 6);
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
      this.getDevices(this.currentPage, 6);
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
      this.getDevices(this.currentPage, 6);
      this.getTotalPage();
    });
  }
}