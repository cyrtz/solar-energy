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
import { DeletePlaceDialogComponent } from '../dialog/delete-place-dialog/delete-place-dialog.component';

@Component({
  selector: 'app-unit-manage',
  templateUrl: './unit-manage.component.html',
  styleUrls: ['./unit-manage.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UnitManageComponent implements AfterViewInit {
  unitDisplayedColumns: string[] = ['Id', 'deviceUnitName', 'operation'];
  placeDisplayedColumns: string[] = ['Id', 'devicePlaceName', 'operation'];
  // expandedDisplayedColumns: string[] = ['Id','devicePlaceName', 'operation'];
  expandedElement!: placeListResponse | null;
  // columnsToDisplayWithExpand = [ 'expand',...this.unitDisplayedColumns];
  unitData: unitListResponse[] = [];
  placeData: placeListResponse[] = [];
  // dataSource = ELEMENT_DATA;
  unitDataSource = new MatTableDataSource<unitListResponse>(this.unitData);
  placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
  currentPage: number = 0;
  placeTotalPage: number = 0;
  unitGuid: string = '';
  unitGuidList: {unitGuid:string, name: string}[] = [];
  placeList: {name: string, unitGuid: string, data: placeListResponse[]}[] = [];

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
    this.getPlaceList().subscribe();
    this.getTotalPage();
  }

  getUnitList(pageIndex: number, pageSize: number): Observable<any> {
    return this.unitService.getUnits(pageIndex, pageSize).pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        // console.log(this.unitData);
        this.unitGuidList = [];
        this.unitData.forEach(element => {
          this.unitGuidList.push({unitGuid: element.deviceUnitGuid, name: element.deviceUnitName});
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
  
  // getPlace(unitGuid: string): Observable<any> {
  //   return this.unitService.searchDevicePlace(unitGuid).pipe(
  //     tap(res => {
  //       // console.log(res)
  //       this.placeData = res.data.placeList;
  //       // console.log(this.placeData);
  //       res.data.placeList.forEach((element, index) => {
  //         return element.Id = index + 1;
  //       });
  //       // this.placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
  //     })
  //   )
  // }

  getPlaceList(): Observable<any> {
    return this.unitService.getPlaces().pipe(
      tap(res => {
        this.placeData = res.data.placeList;
        this.placeList = [];
        console.log(this.placeList);
        this.unitGuidList.forEach((guid) => {
          const places = this.placeData.filter((place) => place.deviceUnitGuid === guid.unitGuid);
          this.placeList.push({ name: guid.name, unitGuid: guid.unitGuid, data: places });
          places.forEach((element, index) => {
            return element.Id = index + 1;
          });
        });
        console.log(this.unitGuidList);
        console.log(this.placeList);
        // this.placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
      })

    )
  }
  onPageChange(event: PageEvent): void {
    this.getUnitList(event.pageIndex, event.pageSize).subscribe();
    // this.getPlaceList().subscribe();
    this.getTotalPage();
  }

  getTotalPage(): void {
    this.unitService.getTotalUnitPage().subscribe(res => {
      this.placeTotalPage = res.data;
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
      this.placeList = [];
      this.getPlaceList().subscribe();
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
      this.placeList = [];
      this.getPlaceList().subscribe();
      this.getTotalPage();
    });
  }
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, unit: string): void {
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
      this.placeList = [];
      this.getPlaceList().subscribe();
      this.getTotalPage();
    });
  }
  deletePlaceDialog(enterAnimationDuration: string, exitAnimationDuration: string, place: placeListResponse): void {
    const dialogRef = this.dialog.open(DeletePlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
      data: place
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getUnitList(this.currentPage, 6).subscribe();
      this.placeList = [];
      this.getPlaceList().subscribe();
      this.getTotalPage();
    });
  }
}
