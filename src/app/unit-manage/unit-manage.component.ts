import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewUnitDialogComponent } from '../dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from '../dialog/delete-unit-dialog/delete-unit-dialog.component';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { unitList, unitListResponse } from '../models/unit-manage';
import { Observable, tap } from 'rxjs';
import { NewPlaceDialogComponent } from '../dialog/new-place-dialog/new-place-dialog.component';

@Component({
  selector: 'app-unit-manage',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.scss']
})
export class UnitManageComponent implements AfterViewInit {
  displayedColumns: string[] = ['Id', 'deviceUnitName', 'devicePlaceName', 'operation'];
  unitData: unitListResponse[] = [];
  dataSource = new MatTableDataSource<unitListResponse>(this.unitData);
  currentPage: number = 0;
  unitTotalPage: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private unitService: UnitManageService,
  ) { }


  ngOnInit(): void {
    this.getUnitList(this.currentPage, 6).subscribe();
    this.getTotalPage();
  }

  getUnitList(pageIndex: number, pageSize: number): Observable<any> {
    return this.unitService.getUnits(pageIndex, pageSize).pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        res.data.unitList.forEach((element, index) => {
          return element.Id = index + 1;
        });
        this.dataSource = new MatTableDataSource<unitListResponse>(this.unitData);
        if (pageIndex === 0) {
          this.currentPage = 0;
        } else {
          this.currentPage = pageIndex;
        }
      })
    );
    // console.log(res.data.unitList);
    // res.data.unitList.forEach((element, index) => {
    //   return element.Id = index + 1;
    // });
    // this.unitData = res.data.unitList;
    // console.log("d",this.unitData);
    // this.dataSource = new MatTableDataSource<unitListResponse>(this.unitData);
    // this.unitData.forEach(element => {
    //   console.log(element.Id)
    // });
    // console.log(this.dataSource);
  }
  onPageChange(event: PageEvent): void {
    this.getUnitList(event.pageIndex, event.pageSize).subscribe();
    this.getTotalPage();
  }

  getTotalPage(): void {
    this.unitService.getTotalUnitPage().subscribe(res => {
      this.unitTotalPage = res.data;
    });
  }

  newUnitDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      console.log('dialogClosed');
      this.getUnitList(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
  newPlaceDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewPlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      console.log('dialogClosed');
      this.getUnitList(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, unit: unitListResponse): void {
    const dialogRef = this.dialog.open(DeleteUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: unit
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getUnitList(this.currentPage, 6).subscribe();
      this.getTotalPage();
    });
  }
}

// export interface UnitData {
//   unitName: string;
//   position: number;
// }

// const UNIT_DATA: UnitData[] = [
//   { position: 1, unitName: '中科大' },
//   { position: 2, unitName: '中興大' },
//   { position: 3, unitName: '中正大' },
//   { position: 4, unitName: '中山大' },
//   { position: 5, unitName: '台科大' },
// ];

