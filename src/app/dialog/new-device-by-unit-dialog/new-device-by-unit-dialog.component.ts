import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { IAddDeviceRequest } from 'src/app/models/device-manage';
import { IPlaceListItem, IUnitListResponse } from 'src/app/models/unit-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-new-device-by-unit-dialog',
  templateUrl: './new-device-by-unit-dialog.component.html',
  styleUrls: ['./new-device-by-unit-dialog.component.scss']
})
export class NewDeviceByUnitDialogComponent implements OnInit{
  
  @Output() dialogClosed = new EventEmitter<void>();
  
  ngOnInit(): void {
    this.getUnitList();
    this.getPlaceList(this.data.unitGuid);
  }

  unitName: string = '';
  isUnitSelected: boolean = false;
  placeList: string[] = [];
  unitData: IUnitListResponse[] = [];
  devicePlaceNameList: IPlaceListItem[] = [];

  newDeviceForm = new FormGroup({
    token: new FormControl(localStorage.getItem('token')),
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
  });

  get deviceName() { return this.newDeviceForm.get('deviceName'); }
  get deviceMacAddress() { return this.newDeviceForm.get('deviceMacAddress'); }
  get deviceUnitGuid() { return this.newDeviceForm.get('deviceUnitGuid'); }
  get devicePlaceGuid() { return this.newDeviceForm.get('devicePlaceGuid'); }

  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
    @Inject(MAT_DIALOG_DATA) public data: { unitGuid: string }
  ) { }

  getUnitList() {
    this.unitService.getTotalUnits().subscribe(res => {
      this.unitData = res.data.unitList;
      this.unitData.forEach(element => {
        if (element.deviceUnitGuid === this.data.unitGuid) {
          this.unitName = element.deviceUnitName;
          this.isUnitSelected = true;
        }
      });
    });
  }

  getPlaceList(deviceUnitGuid: string) {
    if (deviceUnitGuid) {
      this.unitService.searchPlaceByUnit(deviceUnitGuid).subscribe(res => {
        this.devicePlaceNameList = res.data.placeList;
        // console.log(this.devicePlaceNameList);
      });
    }
  }
  
  add(): void {
    const value = this.newDeviceForm.getRawValue();
    this.deviceService.addDevice(value as unknown as IAddDeviceRequest)
      .subscribe(res => {
        if (res.isSuccess == false) {
          // 新增失敗訊息
          alert(res.message);
          return;
        } else {
          // 新增成功訊息
          alert('新增成功');
          // 發布事件
          this.dialogClosed.emit();
        }
      });
  }

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
