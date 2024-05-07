import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewUnitDialogComponent } from '../dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from '../dialog/delete-unit-dialog/delete-unit-dialog.component';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { IPlaceList, IPlaceListResponse, IUnitList, IUnitListResponse } from '../models/unit-manage';
import { Observable, tap } from 'rxjs';
import { NewPlaceDialogComponent } from '../dialog/new-place-dialog/new-place-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeletePlaceDialogComponent } from '../dialog/delete-place-dialog/delete-place-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';

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
export class UnitManageComponent {
  unitDisplayedColumns: string[] = ['Id', 'deviceUnitName', 'operation'];
  placeDisplayedColumns: string[] = ['Id', 'devicePlaceName', 'operation'];
  // expandedDisplayedColumns: string[] = ['Id','devicePlaceName', 'operation'];
  expandedElement!: IPlaceListResponse | null;
  // columnsToDisplayWithExpand = [ 'expand',...this.unitDisplayedColumns];
  unitData: IUnitListResponse[] = [];
  placeData: IPlaceListResponse[] = [];
  // dataSource = ELEMENT_DATA;
  unitDataSource = new MatTableDataSource<IUnitListResponse>(this.unitData);
  placeDataSource = new MatTableDataSource<IPlaceListResponse>(this.placeData);
  currentPage: number = 0;
  unitGuid: string = '';
  unitGuidList: { unitGuid: string, name: string }[] = [];
  placeList: { name: string, unitGuid: string, data: IPlaceListResponse[] }[] = [];
  unitNameFilter?: string | null;

  searchUnitForm = new FormGroup({
    unitNameFilter: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    private unitService: UnitManageService,
  ) { }


  ngOnInit(): void {
    this.getUnitList().pipe(
      tap(() => {
        this.getPlaceList().subscribe();
      })
    ).subscribe();
    // this.getPlaceList().subscribe();
  }

  getUnitList(): Observable<any> {
    return this.unitService.getTotalUnits().pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        // console.log(this.unitData);
        // this.unitGuidList = [];
        // console.log(this.unitData)
        this.unitData.forEach(element => {
          this.unitGuidList.push({ unitGuid: element.deviceUnitGuid, name: element.deviceUnitName });
        })

        this.unitDataSource = new MatTableDataSource<IUnitListResponse>(this.unitData);
        //   if (pageIndex === 0) {
        //     this.currentPage = 0;
        //   } else {
        //     this.currentPage = pageIndex;
        //   }
      })
    );
  }


  getPlaceList(): Observable<any> {
    return this.unitService.getPlaces().pipe(
      tap(res => {
        this.placeData = res.data.placeList;
        // this.placeList = [];
        this.unitGuidList.forEach((guid) => {
          this.placeData.forEach((element) => {
            const places = this.placeData.filter((place) => place.deviceUnitGuid === guid.unitGuid);
            this.placeList.push({ name: guid.name, unitGuid: guid.unitGuid, data: places });
            places.forEach((element, index) => {
              return element.Id = index + 1;
            });
          })


        });
        // console.log(this.unitGuidList);
        // console.log(this.placeList);
        // this.placeDataSource = new MatTableDataSource<placeListResponse>(this.placeData);
      })
    )
  }
  onPageChange(event: PageEvent): void {
    // this.getUnitList(event.pageIndex, event.pageSize).subscribe();
    this.getUnitList().subscribe();
    // this.getPlaceList().subscribe();
  }

  newUnitDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      console.log('dialogClosed');
      this.unitGuidList = [];
      // this.getUnitList(this.currentPage, 6).pipe(
      //   tap(() => {
      //     this.placeList = [];
      //     this.getPlaceList().subscribe();
      //   })
      // ).subscribe();
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
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
      this.unitGuidList = [];
      // this.getUnitList(this.currentPage, 6).pipe(
      //   tap(() => {
      //     this.placeList = [];
      //     this.getPlaceList().subscribe();
      //   })
      // ).subscribe();
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
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
      this.unitGuidList = [];
      // this.getUnitList(this.currentPage, 6).pipe(
      //   tap(() => {
      //     this.placeList = [];
      //     this.getPlaceList().subscribe();
      //   })
      // ).subscribe();
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
  deletePlaceDialog(enterAnimationDuration: string, exitAnimationDuration: string, place: IPlaceListResponse): void {
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
      this.unitGuidList = [];
      // this.getUnitList(this.currentPage, 6).pipe(
      //   tap(() => {
      //     this.placeList = [];
      //     this.getPlaceList().subscribe();
      //   })
      // ).subscribe();
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
}
