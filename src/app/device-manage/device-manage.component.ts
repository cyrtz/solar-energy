import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { Observable, catchError, debounceTime, delay, distinctUntilChanged, fromEvent, map, of, switchMap, tap } from 'rxjs';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { unitListResponse } from '../models/unit-manage';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})
export class DeviceManageComponent implements OnInit {
  // 單位列表
  unitData: unitListResponse[] = [];
  // 表格欄位
  displayedColumns: string[] = ['deviceName', 'deviceUnitName', 'devicePlaceName', 'operation'];
  deviceData: deviceListRes[] = [];
  dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
  // 搜尋狀態 
  isSearch: boolean = false;
  // 搜尋表單資料
  unitNameFilter?: string | null;
  deviceNameFilter?: string | null;
  // 目前搜尋資料
  currentPage: number = 0;
  totalPage: number = 0;
  // 搜尋表單
  searchDeviceForm = new FormGroup({
    unitNameFilter: new FormControl(''),
    deviceNameFilter: new FormControl(''),
  });

  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
    public dialog: MatDialog,
  ) { }

  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDevices(this.currentPage, 6).subscribe();
    this.getTotalPage();
    this.onSearchFormChange();
    this.getUnitList();
  }
  // 取得單位列表
  getUnitList() {
    this.unitService.getTotalUnits().subscribe(res => {
      this.unitData = res.data.unitList;
    });
  }
  // 搜尋表單資料變更
  onSearchFormChange(): void {
    this.searchDeviceForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (value.unitNameFilter?.trim() != '') {
          if (value.deviceNameFilter?.trim() != '') {
            this.isSearch = true;
            this.unitNameFilter = value.unitNameFilter;
            this.deviceNameFilter = value.deviceNameFilter;
            return this.searchDevice(this.unitNameFilter || '', this.deviceNameFilter || '', 0, 6);
          } else {
            this.isSearch = true;
            this.unitNameFilter = value.unitNameFilter;
            this.deviceNameFilter = '';
            return this.searchDevice(this.unitNameFilter || '', this.deviceNameFilter || '', 0, 6);
            // return this.searchDevice(this.unitNameFilter || '','', 0, 6);
          }
        } else if (value.unitNameFilter?.trim() == '' && value.deviceNameFilter?.trim() != '') {
          this.isSearch = true;
          this.unitNameFilter = '';
          this.deviceNameFilter = value.deviceNameFilter;
          return this.searchDevice(this.unitNameFilter || '', this.deviceNameFilter || '', 0, 6);
        } else {
          this.isSearch = false;
          this.unitNameFilter = '';
          this.deviceNameFilter = '';
          return this.getDevices(0, 6);
        }
      })
    ).subscribe(result => {
      if (this.isSearch) {
        this.getSearchTotalPage(this.unitNameFilter || '', this.deviceNameFilter || '');
      }
      // else {
      // 在這裡處理 getDevices 的結果
      // this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
      // }
    });
  }
  // 取得設備列表
  getDevices(page: number, pageSize: number): Observable<any> {
    if (this.isSearch) {
      return this.searchDevice(this.unitNameFilter || '', this.deviceNameFilter || '', page, pageSize)
        .pipe(
          tap(() => this.getSearchTotalPage(this.unitNameFilter || '', this.deviceNameFilter || ''))
        );
    } else {
      return this.deviceService.getDevices(page, pageSize)
        .pipe(
          tap(res => {
            this.deviceData = res.data.deviceList;
            this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
            if (page === 0) {
              this.currentPage = 0;
            } else {
              this.currentPage = page;
            }
          })
        );
    }
  }
  // 取得總頁數
  getTotalPage(): void {
    if (this.isSearch) {
      this.getSearchTotalPage(this.unitNameFilter || '', this.deviceNameFilter || '');
    } else
      this.deviceService.getTotalPage()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
  }
  // 搜尋設備
  searchDevice(unitNameFilterData: string, deviceNameFilterData: string, page: number, pageSize: number): Observable<any> {
    this.isSearch = true;
    return this.deviceService.searchDevice(unitNameFilterData, deviceNameFilterData, page, pageSize)
      .pipe(
        tap(res => {
          this.deviceData = res.data.deviceList;
          this.dataSource = new MatTableDataSource<deviceListRes>(this.deviceData);
          this.currentPage = 0;
        })
      );
  }
  // 取得搜尋總頁數
  getSearchTotalPage(unitNameFilterData: string, deviceNameFilterData: string): void {
    this.deviceService.getSearchTotalPage(unitNameFilterData, deviceNameFilterData)
      .subscribe(
        res => {
          this.totalPage = res.data;
          // this.searchTotalPage = res.data;
        }
      )
  }
  // 分頁事件
  onPageChange(event: PageEvent): void {
    this.getDevices(event.pageIndex, event.pageSize).subscribe();
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
      this.getDevices(this.currentPage, 6).subscribe();
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
      this.getDevices(this.currentPage, 6).subscribe();
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
      this.getDevices(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
}