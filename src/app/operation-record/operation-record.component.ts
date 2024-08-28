import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAccessList, IOperateListRes } from '../models/record';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { OperationRecordService } from '../service/record/operation-record.service';

@Component({
  selector: 'app-operation-record',
  templateUrl: './operation-record.component.html',
  styleUrls: ['./operation-record.component.scss']
})
export class OperationRecordComponent {
  AccessList: IAccessList[] = [{accessLevel:'Admin'}, {accessLevel:'Editor'}, {accessLevel:'Viewer'}];
  operateData: IOperateListRes[] = [];
  dataSource = new MatTableDataSource<IOperateListRes>(this.operateData)
  displayedColumns: string[] = ['logLevel', 'logUser', 'userIdentity', 'logMessage', 'createTime'];
  totalPage: number = 0;
  currentPage: number = 0;
  isSearch: boolean = false;
  searchOperateForm = new FormGroup({
    userPermissionsFilter: new FormControl(''),
    userNameFilter: new FormControl(''),
  });
  userPermissionsFilter?: string | null;
  userNameFilter?: string | null;
  userAccount: string = '';
  userRole: string = '';
  constructor(
    private recordservice: OperationRecordService,
    private matPaginatorIntl: MatPaginatorIntl,
  ) { }
  @ViewChild('paginator') paginator!: MatPaginatorIntl;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.userAccount = payload.userAccount;
      this.userRole = payload.customRole;
    }
    this.getOperates(0, 6).subscribe();
    this.getTotalPage();
    this.onSearchFormChange();
    this.paginatorContent();
  }
  onSearchFormChange(): void {
    this.searchOperateForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (value.userPermissionsFilter != '') {
          if (value.userNameFilter?.trim() != '') {
            this.isSearch = true;
            this.userPermissionsFilter = value.userPermissionsFilter;
            this.userNameFilter = value.userNameFilter;
            return this.searchOperates(this.userPermissionsFilter || '', this.userNameFilter || '', 0, 6);
          }else {
            this.isSearch = true;
            this.userPermissionsFilter = value.userPermissionsFilter;
            this.userNameFilter = value.userNameFilter;
            return this.searchOperates(this.userPermissionsFilter || '', this.userNameFilter || '', 0, 6);
          }
        } else if (value.userPermissionsFilter == '' && value.userNameFilter?.trim() != '') {
          this.isSearch = true;
          this.userPermissionsFilter = '';
          this.userNameFilter = value.userNameFilter;
          return this.searchOperates(this.userPermissionsFilter || '', this.userNameFilter || '', 0, 6);
        } else {
          this.isSearch = false;
          this.userPermissionsFilter = '';
          this.userNameFilter = '';
          return this.getOperates(0, 6);
        }
      })
    ).subscribe(result => {
      if (this.isSearch) {
        this.getSearchTotalPage(this.userPermissionsFilter || '', this.userNameFilter || '');
      }else {
        this.getTotalPage();
      }
    });
  }
  getOperates(page: number, pageSize: number): Observable<any> {
      return this.recordservice.getOperates(page, pageSize)
        .pipe(
          tap(res => {
            this.operateData = res.data;
            this.dataSource = new MatTableDataSource<IOperateListRes>(this.operateData);
            if (page === 0) {
              this.currentPage = 0;
            } else {
              this.currentPage = page;
            }
          })
        );
  }
  searchOperates(userDepartmentFilter: string, userNameFilter: string, page: number, pageSize: number): Observable<any> {
    this.isSearch = true;
    return this.recordservice.searchOperates(userDepartmentFilter, userNameFilter, page, pageSize)
      .pipe(
        tap(res => {
          this.operateData = res.data;
          this.dataSource = new MatTableDataSource<IOperateListRes>(this.operateData);
          this.currentPage = 0;
        })
      );
  }
  getTotalPage(): void {
      this.recordservice.getTotalCount()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
    // }
  }
  getSearchTotalPage(userDepartmentFilter: string, userNameFilter: string): void {
    this.recordservice.getSearchTotalPage(userDepartmentFilter, userNameFilter)
      .subscribe(
        res => {
          this.totalPage = res.data;
          // this.searchTotalPage = res.data;
        }
      )
  }
  onPageChange(event: PageEvent): void {
    this.getOperates(event.pageIndex, event.pageSize).subscribe();
    this.getTotalPage();
  }
  // 分頁文字內容
  paginatorContent(): void {
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
}
