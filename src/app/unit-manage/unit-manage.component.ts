import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewUnitDialogComponent } from '../dialog/new-unit-dialog/new-unit-dialog.component';
import { DeleteUnitDialogComponent } from '../dialog/delete-unit-dialog/delete-unit-dialog.component';
import { UnitManageService } from '../service/unit-manage/unit-manage.service';
import { IPlaceListItem, IUnitListResponse } from '../models/unit-manage';
import { debounceTime, Observable, of, switchMap, tap } from 'rxjs';
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
  expandedElement!: IPlaceListItem | null;
  // 單位列表
  unitData: IUnitListResponse[] = [];
  // 地點列表
  placeData: IPlaceListItem[] = [];
  unitDataSource = new MatTableDataSource<IUnitListResponse>(this.unitData);
  placeDataSource = new MatTableDataSource<IPlaceListItem>(this.placeData);
  currentPage: number = 0;
  unitGuid: string = '';
  unitGuidList: { unitGuid: string, name: string }[] = [];
  placeList: { name: string, unitGuid: string, data: IPlaceListItem[] }[] = [];
  // 搜尋單位列表
  searchUnitData: IUnitListResponse[] = [];
  // 搜尋表單
  searchUnitForm = new FormGroup({
    unitNameFilter: new FormControl(''),
  });
  // 搜尋表單資料
  unitNameFilter?: string | null;

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
    this.onSearchUnitChange();
  }
  
  // 取得單位列表
  getUnitList(): Observable<any> {
    return this.unitService.getTotalUnits().pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        this.unitData.forEach(element => {
          this.unitGuidList.push({ unitGuid: element.deviceUnitGuid, name: element.deviceUnitName });
        })
      })
    );
  }
  // 取得地點
  getPlaceList(): Observable<any> {
    return this.unitService.getPlaces().pipe(
      tap(res => {
        this.placeData = res.data.placeList;

        this.placeList = this.unitGuidList.map((guid) => {
          const places = this.placeData.filter((place) => place.deviceUnitGuid === guid.unitGuid);
          places.forEach((element, index) => {
            element.Id = index + 1;
          });
          return { name: guid.name, unitGuid: guid.unitGuid, data: places };
        });
      })
    )
  }
  // 新增單位
  newUnitDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '400px',
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      console.log('dialogClosed');
      this.unitGuidList = [];
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
  // 新增地點
  newPlaceDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewPlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '400px',
    });
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      console.log('dialogClosed');
      this.unitGuidList = [];
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
  // 刪除單位
  deleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, unit: string): void {
    const dialogRef = this.dialog.open(DeleteUnitDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '400px',
      data: unit
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.unitGuidList = [];
 
      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
  // 刪除地點
  deletePlaceDialog(enterAnimationDuration: string, exitAnimationDuration: string, place: IPlaceListItem): void {
    const dialogRef = this.dialog.open(DeletePlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '400px',
      data: place
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
      // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.unitGuidList = [];

      this.getUnitList().pipe(
        tap(() => {
          this.placeList = [];
          this.getPlaceList().subscribe();
        })
      ).subscribe();
    });
  }
  // 搜尋輸入框資料變更
  onSearchUnitChange(): void {
    this.searchUnitForm.valueChanges.pipe(
      debounceTime(500),
      switchMap((formValue) => {
        if (formValue.unitNameFilter?.trim() != '') {
          // 有搜尋條件時
          this.unitGuidList = [];
          this.placeList = [];
          this.searchUnitData = this.unitData.filter((unit) => {
            return unit.deviceUnitName.includes(formValue.unitNameFilter?.trim() || '');
          });
          this.unitGuidList = this.searchUnitData.map((unit: { deviceUnitGuid: any; deviceUnitName: any; }) => ({ unitGuid: unit.deviceUnitGuid, name: unit.deviceUnitName }));
          return this.getPlaceList();
        } else {
          // 沒有搜尋條件時，顯示全部資料
          this.unitGuidList = this.unitData.map((unit: { deviceUnitGuid: any; deviceUnitName: any; }) => ({ unitGuid: unit.deviceUnitGuid, name: unit.deviceUnitName }));
          return this.getPlaceList();
        }
      })
    ).subscribe();  // 確保你有訂閱這個 Observable
  }
  
}
