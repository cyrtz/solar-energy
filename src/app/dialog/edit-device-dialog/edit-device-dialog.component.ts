import { Token } from '@angular/compiler';
import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { IEditDeviceRequest, deviceListRes } from 'src/app/models/device-manage';
import { IPlaceListItem, IUnitListResponse } from 'src/app/models/unit-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.scss']
})
export class EditDeviceDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  device: deviceListRes;
  selectedUnitGuid!: string;
  selectedPlaceGuid!: string;
  isUnitSelected: boolean = false;
  placeList: string[] = [];
  unitData: IUnitListResponse[] = [];
  devicePlaceNameList: IPlaceListItem[] = [];
  unitName: string = '';
  editDeviceForm = new FormGroup({
    deviceOldName: new FormControl(''),
    deviceName: new FormControl('', {
      validators: [
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.validate.bind(this),
      ],
    }),
    deviceUnitGuid: new FormControl(''),
    devicePlaceGuid: new FormControl(''),
  })
  
  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();
  
  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: deviceListRes
  ) {
    this.device = data;
  }

  ngOnInit(): void {
    this.editDeviceForm.patchValue({
      deviceOldName: this.device.deviceName,
      deviceName: '',
      deviceUnitGuid: this.device.deviceGuid,
      devicePlaceGuid: this.device.devicePlaceGuid,
    });
    this.selectedUnitGuid = this.device.deviceUnitGuid;
    this.getUnitList();
    this.selectedPlaceGuid = this.device.devicePlaceGuid;
    this.getPlaceList(this.device.deviceUnitGuid);
  }

  get deviceName() { return this.editDeviceForm.get('deviceName'); }
  get deviceUnitGuid() { return this.editDeviceForm.get('deviceUnitGuid'); }
  get devicePlaceGuid() { return this.editDeviceForm.get('devicePlaceGuid'); }

  // 取得單位
  getUnitList() {
    this.unitService.getTotalUnits().pipe(
      tap(res => {
        this.unitData = res.data.unitList;
        this.unitData.forEach(element => {
          if (element.deviceUnitGuid === this.device.deviceUnitGuid) {
            this.unitName = element.deviceUnitName;
            this.isUnitSelected = true;
          }
        });
        this.editDeviceForm.patchValue({
          deviceUnitGuid: this.device.deviceUnitGuid
        });
      })
    ).subscribe();
  }
  
  // 單位選擇事件
  onUnitChange(deviceUnitGuid: string) {
    this.getPlaceList(deviceUnitGuid);
    this.isUnitSelected = true;
    this.editDeviceForm.get('devicePlaceGuid')?.reset();
    this.selectedUnitGuid = deviceUnitGuid;
    this.selectedPlaceGuid = '';
    if (deviceUnitGuid) {
      this.editDeviceForm.get('devicePlaceGuid')?.setValidators(Validators.required);
    } else {
      this.editDeviceForm.get('devicePlaceGuid')?.clearValidators();
    }
  }
  // 取得與單位相應的地點
  getPlaceList(deviceUnitGuid: string) {
    this.unitService.searchPlaceByUnit(deviceUnitGuid).subscribe(res => {
      this.devicePlaceNameList = res.data.placeList;
      if (this.devicePlaceNameList.length === 0) {
        this.editDeviceForm.get('devicePlaceGuid')?.setErrors({ 'noPlaces': true });
      } else {
        this.editDeviceForm.get('devicePlaceGuid')?.setErrors(null);
        this.editDeviceForm.patchValue({
          devicePlaceGuid: this.selectedPlaceGuid
        });
      }
    });
  }
  // 編輯設備
  edit(): void {
    // 獲取表單數據
    const value = this.editDeviceForm.getRawValue();
    if (value.deviceName === '') {
      value.deviceName = value.deviceOldName;
    }
    this.deviceService.editDevice(value as unknown as IEditDeviceRequest)
      .subscribe(res => {
        this.openSnackBar(res.message, '關閉')
        this.dialogClosed.emit();
      });
  }
  // 驗證設備名稱是否重複
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value === '') {
      return of(null);
    }
    return this.deviceService.isExists(control.value).pipe(
      map(res => {
        if (res.data === false) {
          return { uniqueAlterEgo: true };
        }
        return null;
      }),
      catchError(() => of(null))
    );
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
