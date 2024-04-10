import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewUnitDialogComponent } from '../dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from '../dialog/delete-unit-dialog/delete-unit-dialog.component';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { placeList, placeListResponse, unitList, unitListResponse } from '../models/unit-manage';
import { Observable, tap } from 'rxjs';
import { NewPlaceDialogComponent } from '../dialog/new-place-dialog/new-place-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-unit-manage',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0'})),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UnitManageComponent implements AfterViewInit {
  unitDisplayedColumns: string[] = ['Id', 'deviceUnitName', 'operation'];
  expandedDisplayedColumns: string[] = ['Id','devicePlaceName', 'operation'];
  expandedElement!: placeListResponse | null;
  columnsToDisplayWithExpand = [ 'expand',...this.unitDisplayedColumns];
  unitData: unitListResponse[] = [];
  placeData: placeListResponse[] = [];
  // dataSource = ELEMENT_DATA;
  unitDataSource = new MatTableDataSource<unitListResponse>(this.unitData);
  placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
  currentPage: number = 0;
  unitTotalPage: number = 0;
  unitGuid: string = '';
  unitGuidList: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.placeDataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private unitService: UnitManageService,
  ) { }


  ngOnInit(): void {
    this.getUnitList(this.currentPage, 6).subscribe();
    this.getPlaceList(this.unitGuid).subscribe();
    this.getTotalPage();
  }

  getUnitList(pageIndex: number, pageSize: number): Observable<any> {
    return this.unitService.getUnits(pageIndex, pageSize).pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        // this.unitGuid = this.unitData[0].deviceUnitGuid;
        // console.log(this.unitGuid)
        // res.data.unitList.forEach((element, index) => {
        //   return element.Id = index + 1;
        // });
        res.data.unitList.forEach(element => {
          this.unitGuid = element.deviceUnitGuid;
          console.log(this.unitGuid);
          // this.unitGuidList = this.unitGuidList.push(element.deviceUnitGuid);
        })
        this.unitDataSource = new MatTableDataSource<unitListResponse>(this.unitData);
        if (pageIndex === 0) {
          this.currentPage = 0;
        } else {
          this.currentPage = pageIndex;
        }
      })
    );
  }

  getPlaceList(unitGuid: string): Observable<any> {
    return this.unitService.getPlaces().pipe(
      tap(res => {
        this.placeData = res.data.placeList;
        if (unitGuid === this.unitGuid) {
          this.placeData = this.placeData.filter(element => element.deviceUnitGuid === unitGuid);
          console.log(this.placeData);
        }
        res.data.placeList.forEach((element, index) => {
          return element.Id = index + 1;
        });
        this.placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
      })

    )
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
    // this.getUnitList(event.pageIndex, event.pageSize).subscribe();
    this.getPlaceList(this.unitGuid).subscribe();
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
