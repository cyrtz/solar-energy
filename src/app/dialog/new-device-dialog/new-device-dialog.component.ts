import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { DeviceManageService } from '../../service/device-manage/device-manage.service';
import { IAddDeviceRequest } from '../../models/device-manage';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { Observable, catchError, concatMap, debounceTime, delay, exhaustMap, first, map, of, pipe, switchMap } from 'rxjs';
import { UnitManageService } from '../../service/unit-manage/unit-manage.service';
import { unitListResponse } from 'src/app/models/unit-manage';
@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent implements AsyncValidator, OnInit {

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  ngOnInit(): void {
    this.getUnitList();
  }

  unitData: unitListResponse[] = [];

  devicePlaceNameList = [
    { value: '頂樓', viewValue: '頂樓' },
    { value: '操場', viewValue: '操場' },
    { value: '廣場', viewValue: '廣場' },
  ];
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
    deviceUnitGuid: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    devicePlaceName: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
  })

  get deviceName() { return this.newDeviceForm.get('deviceName'); }
  get deviceUnitGuid() { return this.newDeviceForm.get('deviceUnitGuid'); }
  get devicePlaceName() { return this.newDeviceForm.get('devicePlaceName'); }

  constructor(
    private deviceService: DeviceManageService,
    private unitService: UnitManageService,
  ) { }

  getUnitList() {
    this.unitService.getUnits().subscribe(res => {
      this.unitData = res.data.unitList;
    });
  }
  // 新增設備
  add(): void {
    const value = this.newDeviceForm.getRawValue();
    this.deviceService.addDevice(value as unknown as IAddDeviceRequest)
      .subscribe(res => {
        // 發布事件
        this.dialogClosed.emit();
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
