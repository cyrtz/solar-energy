import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { IErrorListRes, IErrorSystemListRes, IErrorTypeList } from 'src/app/models/error-detection';
import { ErrorSystemService } from 'src/app/service/error-detection/error-system/error-system.service';

@Component({
  selector: 'app-error-system',
  templateUrl: './error-system.component.html',
  styleUrls: ['./error-system.component.scss']
})
export class ErrorSystemComponent {
  searchSystemErrorForm = new FormGroup({
    errorSystemTypeFilter: new FormControl(''),
    errorSystemNameFilter: new FormControl(''),
  });
  ErrorList: IErrorTypeList[] = [{ errorType: 'Error' }, { errorType: 'Exception' }];
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
    this.errorsystemservice.getTotalCount()
      .subscribe(
        res => {
          this.totalPage = res.data;
        }
      )
  }
  getSystemError(page: number, pageSize: number): Observable<IErrorListRes<IErrorSystemListRes>> {
    return this.errorsystemservice.getSystemError(page, pageSize)
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
  }
  onPageChange(event: PageEvent): void {
    this.getSystemError(event.pageIndex, event.pageSize).subscribe();
    this.getTotalPage();
  }
}
