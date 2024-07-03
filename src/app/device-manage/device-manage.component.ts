import { Component, OnInit, ViewChild } from '@angular/core';
import { deviceListRes } from '../models/device-manage';
import { DeviceManageService } from '../service/device-manage/device-manage.service';
import { NewDeviceDialogComponent } from '../dialog/new-device-dialog/new-device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteDeviceDialogComponent } from '../dialog/delete-device-dialog/delete-device-dialog.component';
import { Observable, debounceTime, switchMap, tap } from 'rxjs';
import { EditDeviceDialogComponent } from '../dialog/edit-device-dialog/edit-device-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { IUnitListResponse } from '../models/unit-manage';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Component({
  selector: 'app-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss'],
})
export class DeviceManageComponent implements OnInit {
  // 表格欄位
  displayedColumns: string[] = ['deviceName', 'deviceUnitName', 'devicePlaceName', 'operation'];
  // 單位列表
  unitData: IUnitListResponse[] = [];
  // 設備列表
  deviceData: deviceListRes[] = [];
  // 表單來源
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
    private matPaginatorIntl: MatPaginatorIntl,
  ) { }

  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    this.getDevices(this.currentPage, 6).subscribe();
    this.getTotalPage();
    this.onSearchFormChange();
    this.getUnitList();
    this.paginatorContent();
  }
  // 取得單位列表
  getUnitList(): void {
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
        } else if (value.unitNameFilter?.trim() == '' && value.deviceNameFilter?.trim() != ''){
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
      }else{
        this.getTotalPage();
      }
    });
  }
  // 取得設備列表 // 回傳 Observable 之 Interface，此處似乎有兩種return
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
      this.deviceService.getTotalCount()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
  }
  // 搜尋設備 // 回傳 Observable 之 Interface
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
  // 分頁文字內容
  paginatorContent(): void{
    this.matPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number):
    string => {
      if (length === 0 || pageSize === 0) {
        return `第 0 筆、共 ${length} 筆`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

      return `第 ${startIndex + 1} ~ ${endIndex} 筆、共 ${length} 筆`;
    };
    // 設定其他顯示資訊文字
    this.matPaginatorIntl.itemsPerPageLabel = '每頁筆數：';
    this.matPaginatorIntl.nextPageLabel = '下一頁';
    this.matPaginatorIntl.previousPageLabel = '上一頁';
  }
  // 新增設備
  newDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewDeviceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getDevices(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
  // 刪除設備
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
  // 修改設備
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