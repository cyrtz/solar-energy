import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { IErrorSystemListRes, IErrorTypeList } from 'src/app/models/record';
import { ErrorSystemService } from 'src/app/service/error-detection/error-system/error-system.service';

@Component({
  selector: 'app-error-system',
  templateUrl: './error-system.component.html',
  styleUrls: ['./error-system.component.scss']
})
export class ErrorSystemComponent {
  searchSystemErrorForm = new FormGroup({
    userPermissionsFilter: new FormControl(''),
    userNameFilter: new FormControl(''),
  });
  ErrorList: IErrorTypeList[] = [{errorType:'Error'}, {errorType:'Exception'}];
  errorSystemData: IErrorSystemListRes[] = [];
  dataSource = new MatTableDataSource<IErrorSystemListRes>(this.errorSystemData)
  displayedColumns: string[] = ['logUser', 'userIdentity', 'logMessage', 'createTime'];
  totalPage: number = 0;
  currentPage: number = 0;


  constructor(
    private errorsystemservice: ErrorSystemService,

  ) { }

  ngOnInit(): void { }

  getTotalPage(): void {
    // if (this.isSearch) {
      // this.getSearchTotalPage(this.userDepartmentFilter || '', this.userNameFilter || '');
    // } else{
      this.errorsystemservice.getTotalCount()
        .subscribe(
          res => {
            this.totalPage = res.data;
          }
        )
    // }
  }
  getOperates(page: number, pageSize: number): Observable<any> {
    // if (this.isSearch) {
    //   return this.searchUser(this.userDepartmentFilter || '', this.userNameFilter || '', page, pageSize)
    //     .pipe(
    //       tap(() => this.getSearchTotalPage(this.userDepartmentFilter || '', this.userNameFilter || ''))
    //     );
    // } else {
      return this.errorsystemservice.getOperates(page, pageSize)
        .pipe(
          tap(res => {
            this.errorSystemData = res.data;
            this.dataSource = new MatTableDataSource<IErrorSystemListRes>(this.errorSystemData);
            if (page === 0) {
              this.currentPage = 0;
            } else {
              this.currentPage = page;
            }
          })
        );
    // }
  }
  onPageChange(event: PageEvent): void {
    this.getOperates(event.pageIndex, event.pageSize).subscribe();
    this.getTotalPage();
  }
}
