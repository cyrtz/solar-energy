import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepartmentList, IUserListRes } from '../models/account';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, switchMap, tap } from 'rxjs';
import { AccountService } from '../service/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../dialog/new-user-dialog/new-user-dialog/new-user-dialog.component';
import { DeleteUserDialogComponent } from '../dialog/delete-user-dialog/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent  implements OnInit{
  // 表格欄位
  displayedColumns: string[] = ['userAccount', 'userName', 'userIdentity', 'userDepartment', 'userEmail', 'userPhone', 'operation'];
  // 行政/教學列表
  userDepartment: DepartmentList[] = [];
  // 使用者列表
  userData: IUserListRes[] = [];
  // 表單來源
  dataSource = new MatTableDataSource<IUserListRes>(this.userData);
  // 搜尋狀態 
  isSearch: boolean = false;
  // 搜尋表單資料
  userDepartmentFilter?: string | null;
  userNameFilter?: string | null;
  // 目前搜尋資料
  currentPage: number = 0;
  totalPage: number = 0;
  // 搜尋表單
  searchUserForm = new FormGroup({
    userDepartmentFilter: new FormControl(''),
    userNameFilter: new FormControl(''),
  });
  userAccount: string = '';
  userRole: string = '';
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
    private matPaginatorIntl: MatPaginatorIntl,
  ) { }
  // 取得分頁
  @ViewChild('paginator') paginator!: MatPaginator;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.userAccount = payload.userAccount;
      this.userRole = payload.customRole;
    }
    this.getUsers(this.currentPage, 6).subscribe();
    this.getTotalPage();
    this.onSearchFormChange();
    this.getDepartmentList();
    this.paginatorContent();
  }
  // 取得行政/教學列表
  getDepartmentList(): void {
    this.accountService.getDepartmentList()
      .subscribe(res => {
        this.userDepartment = res.data.departmentList;
      });
  }
  // 搜尋表單資料變更
  onSearchFormChange(): void {
    this.searchUserForm.valueChanges.pipe(
      debounceTime(500),
      switchMap(value => {
        if (value.userDepartmentFilter?.trim() != '') {
          if (value.userNameFilter?.trim() != '') {
            this.isSearch = true;
            this.userDepartmentFilter = value.userDepartmentFilter;
            this.userNameFilter = value.userNameFilter;
            return this.searchUser(this.userDepartmentFilter || '', this.userNameFilter || '', 0, 6);
          }else {
            this.isSearch = true;
            this.userDepartmentFilter = value.userDepartmentFilter;
            this.userNameFilter = value.userNameFilter;
            return this.searchUser(this.userDepartmentFilter || '', this.userNameFilter || '', 0, 6);
          }
        } else if (value.userDepartmentFilter?.trim() == '' && value.userNameFilter?.trim() != '') {
          this.isSearch = true;
          this.userDepartmentFilter = '';
          this.userNameFilter = value.userNameFilter;
          return this.searchUser(this.userDepartmentFilter || '', this.userNameFilter || '', 0, 6);
        } else {
          this.isSearch = false;
          this.userDepartmentFilter = '';
          this.userNameFilter = '';
          return this.getUsers(0, 6);
        }
      })
    ).subscribe(result => {
      if (this.isSearch) {
        this.getSearchTotalPage(this.userDepartmentFilter || '', this.userNameFilter || '');
      }else {
        this.getTotalPage();
      }
    });
  }
  // 取得使用者列表 // 回傳 Observable 之 Interface，此處似乎有兩種return 尚未修改成後端分頁（pageIndex與pageSize）
  getUsers(page: number, pageSize: number): Observable<any> {
    if (this.isSearch) {
      return this.searchUser(this.userDepartmentFilter || '', this.userNameFilter || '', page, pageSize)
        .pipe(
          tap(() => this.getSearchTotalPage(this.userDepartmentFilter || '', this.userNameFilter || ''))
        );
    } else {
      return this.accountService.getUserList(page, pageSize)
        .pipe(
          tap(res => {
            this.userData = res.data.userList;
            this.dataSource = new MatTableDataSource<IUserListRes>(this.userData);
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
      this.getSearchTotalPage(this.userDepartmentFilter || '', this.userNameFilter || '');
    } else{
      this.accountService.getTotalCount()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
    }
  }
  // 搜尋使用者 // 回傳 Observable 之 Interface
  searchUser(userDepartmentFilter: string, userNameFilter: string, page: number, pageSize: number): Observable<any> {
    this.isSearch = true;
    return this.accountService.searchUser(userDepartmentFilter, userNameFilter, page, pageSize)
      .pipe(
        tap(res => {
          this.userData = res.data.userList;
          this.dataSource = new MatTableDataSource<IUserListRes>(this.userData);
          this.currentPage = 0;
        })
      );
  }
  // 取得搜尋總數
  getSearchTotalPage(userDepartmentFilter: string, userNameFilter: string): void {
    this.accountService.getSearchTotalPage(userDepartmentFilter, userNameFilter)
      .subscribe(
        res => {
          this.totalPage = res.data;
          // this.searchTotalPage = res.data;
        }
      )
  }
  // 分頁事件
  onPageChange(event: PageEvent): void {
    this.getUsers(event.pageIndex, event.pageSize).subscribe();
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
  // 新增使用者
  newDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getUsers(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
  // 刪除使用者
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, userData: IUserListRes,): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: userData,
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      this.getUsers(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
}
