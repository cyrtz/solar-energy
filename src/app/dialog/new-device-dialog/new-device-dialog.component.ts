import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { DeviceManageService } from '../../service/device-manage/device-manage.service';
import { IAddDeviceRequest } from '../../models/device-manage';
import { EventEmitter, Output } from '@angular/core';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { UnitManageService } from '../../service/unit-manage/unit-manage.service';
import { IPlaceListItem, IUnitListResponse } from 'src/app/models/unit-manage';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent implements AsyncValidator, OnInit {
  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isUnitSelected: boolean = false;
  placeList: string[] = [];
  unitData: IUnitListResponse[] = [];
  devicePlaceNameList: IPlaceListItem[] = [];

  // 新增設備表單
  newDeviceForm = new FormGroup({
    deviceName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.validate.bind(this),
        this.cannotEmpty.bind(this),
      ],
    }),
    deviceMacAddress: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    deviceUnitGuid: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    devicePlaceGuid: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  })

  get deviceName() { return this.newDeviceForm.get('deviceName'); }
  get deviceMacAddress() { return this.newDeviceForm.get('deviceMacAddress'); }
  get deviceUnitGuid() { return this.newDeviceForm.get('deviceUnitGuid'); }
  get devicePlaceGuid() { return this.newDeviceForm.get('devicePlaceGuid'); }

  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
    private _snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.getUnitList();
  }
  // 取得單位
  getUnitList() {
    this.unitService.getTotalUnits().subscribe(res => {
      this.unitData = res.data.unitList;
    });
  }
  // 單位選擇事件
  onUnitChange(deviceUnitGuid: string) {
    this.getPlaceList(deviceUnitGuid);
    this.isUnitSelected = true;
    this.newDeviceForm.get('devicePlaceGuid')?.reset();
  }
  // 取得與單位相應的地點
  getPlaceList(deviceUnitGuid: string) {
    // getDevicePlaceList
    this.unitService.searchPlaceByUnit(deviceUnitGuid).subscribe(res => {
      this.devicePlaceNameList = res.data.placeList;
      if (this.devicePlaceNameList.length === 0) {
        this.newDeviceForm.get('devicePlaceGuid')?.setErrors({ 'noPlaces': true });
      }
    });
  }
  // 新增設備
  add(): void {
    const value = this.newDeviceForm.getRawValue();
    this.deviceService.addDevice(value as unknown as IAddDeviceRequest)
      .subscribe(res => {
        if (res.isSuccess == false) {
          // 新增失敗訊息
          this.openSnackBar('新增失敗');
          return;
        } else {
          // 新增成功訊息
          this.openSnackBar('新增成功');
          // 發布事件
          this.dialogClosed.emit();
        }
      });
  }
  openSnackBar(message: string): void {
    this._snackBar.open(message, '關閉', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
  // 驗證設備名稱是否重複
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(1000),
      switchMap(value =>
        this.deviceService.isExists(value).pipe(
          map(res => res.data === false ? { uniqueAlterEgo: true } : null),
          catchError(() => of(null))
        )
      )
    );
  }
  // 驗證是否為空
  cannotEmpty(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value.trim() === '') {
      return of({ 'cannotEmpty': true });
    }
    return of(null);
  }
}
