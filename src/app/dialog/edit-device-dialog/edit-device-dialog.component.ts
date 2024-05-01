import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, catchError, map, of } from 'rxjs';
import { IEditDeviceRequest, deviceListRes } from 'src/app/models/device-manage';
import { placeListResponse, unitListResponse } from 'src/app/models/unit-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.scss']
})
export class EditDeviceDialogComponent implements OnInit {
  // 接收從父元件傳遞的設備數據
  device: deviceListRes;

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  ngOnInit(): void {
    this.editDeviceForm.patchValue({
      deviceOldName: this.device.deviceName,
      deviceName: '',
      deviceUnitGuid: '',
      devicePlaceGuid: this.device.devicePlaceGuid,
    });
    this.getUnitList();
  }

  isUnitSelected: boolean = false;
  placeList: string[] = [];
  unitData: unitListResponse[] = [];
  devicePlaceNameList: placeListResponse[] = [];

  editDeviceForm = new FormGroup({
    deviceOldName: new FormControl(''),
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

  get deviceName() { return this.editDeviceForm.get('deviceName'); }
  get deviceUnitGuid() { return this.editDeviceForm.get('deviceUnitGuid'); }
  get devicePlaceGuid() { return this.editDeviceForm.get('devicePlaceGuid'); }

  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
    @Inject(MAT_DIALOG_DATA) public data: deviceListRes
  ) {
    this.device = data;
  }

  // 取得單位
  getUnitList() {
    this.unitService.getTotalUnits().subscribe(res => {
      this.unitData = res.data.unitList;
      // 預設選擇的單位
      let unit = this.unitData.find(unit => unit.deviceUnitName === this.device.deviceUnitName);
      if(unit){
        this.getPlaceList(unit.deviceUnitGuid);
        this.isUnitSelected = true;
        this.editDeviceForm.get('devicePlaceGuid')?.reset();
      }
    });
  }
  // 單位選擇事件
  // onUnitChange(deviceUnitGuid: string) {
  //   this.getPlaceList(deviceUnitGuid);
  //   this.isUnitSelected = true;
  //   this.editDeviceForm.get('devicePlaceGuid')?.reset();
  // }
  // 取得與單位相應的地點
  getPlaceList(deviceUnitGuid: string) {
    this.unitService.searchDevicePlace(deviceUnitGuid).subscribe(res => {
      this.devicePlaceNameList = res.data.placeList;
      if (this.devicePlaceNameList.length === 0) {
        this.editDeviceForm.get('devicePlaceGuid')?.setErrors({ 'noPlaces': true });
      }
    });
  }
  // 編輯設備
  edit(): void {
    // 獲取表單數據
    const value = this.editDeviceForm.getRawValue();
    this.deviceService.editDevice(value as unknown as IEditDeviceRequest)
      .subscribe(res => {
        // console.log(res.message);
        // 發布事件
        this.dialogClosed.emit();
        console.log(value);
      });
  }
  // 驗證設備名稱是否重複
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
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
  // 驗證是否為空
  cannotEmpty(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value.trim() === '') {
      return of({ 'cannotEmpty': true });
    }
    return of(null);
  }
}
