import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { IErrorDeviceListRes, IErrorTypeList } from 'src/app/models/error-detection';
import { ErrorDeviceService } from 'src/app/service/error-detection/error-device/error-device.service';

@Component({
  selector: 'app-error-device',
  templateUrl: './error-device.component.html',
  styleUrls: ['./error-device.component.scss']
})
export class ErrorDeviceComponent {
  searchDeviceErrorForm = new FormGroup({
    deviceErrorTypeFilter: new FormControl(''),
    deviceErrorNameFilter: new FormControl(''),
  })

  errorTypeList: IErrorTypeList[] = [{ errorType: '太陽能板異常' }, { errorType: '電箱異常' }, { errorType: '控制器異常' }];
  errorDeviceData: IErrorDeviceListRes[] = [];
  dataSource = new MatTableDataSource<IErrorDeviceListRes>(this.errorDeviceData);
  displayedColumns: string[] = ['deviceName', 'deviceUnitName', 'devicePlaceName', 'errorType', 'createTime'];
  totalPage: number = 0;
  currentPage: number = 0;

  constructor(
    private errorDeviceservice: ErrorDeviceService,
  ) { }

  ngOnInit(): void { }

  getTotalPage(): void {
    this.errorDeviceservice.getTotalCount()
      .subscribe(
        res => {
          this.totalPage = res.data;
        }
      )
  }

  getDeviceError(page: number, pageSize: number): Observable<any> {
    return this.errorDeviceservice.getDeviceError(page, pageSize)
      .pipe(
        tap(res => {
          this.errorDeviceData = res.data;
          this.dataSource = new MatTableDataSource<IErrorDeviceListRes>(this.errorDeviceData);
          if (page === 0) {
            this.currentPage = 0;
          } else {
            this.currentPage = page;
          }
        })
      );
  }

  onPageChange(event: PageEvent): void {
    this.getDeviceError(event.pageIndex, event.pageSize).subscribe();
    this.getTotalPage();
  }
}