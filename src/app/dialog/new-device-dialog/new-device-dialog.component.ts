import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { DeviceManageService } from '../../service/device-manage/device-manage.service';
import { INewDeviceRequest, IUnitListResponse } from '../../models/device-manage';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';

@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent implements AsyncValidator {

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  unitsNameList: IUnitListResponse[] = [
    { value: '中科大', viewValue: '中科大' },
    { value: '新大', viewValue: '新大' },
    { value: '舊大', viewValue: '舊大' },
  ];
  devicePlaceNameList: IUnitListResponse[] = [
    { value: '頂樓', viewValue: '頂樓' },
    { value: '操場', viewValue: '操場' },
    { value: '廣場', viewValue: '廣場' },
  ];
  newDeviceForm = new FormGroup({
    deviceName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.validate.bind(this),
        this.cannotEmpty.bind(this),],
    }),
    deviceUnitName: new FormControl('', {
      validators: [
        Validators.required,
      ],
    }),
    devicePlaceName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.cannotEmpty.bind(this),
      ]
    }),
  })

  get deviceName() { return this.newDeviceForm.get('deviceName'); }
  get deviceUnitName() { return this.newDeviceForm.get('deviceUnitName'); }
  get devicePlaceName() { return this.newDeviceForm.get('devicePlaceName'); }

  constructor(
    private deviceService: DeviceManageService,
  ) { }

  // 新增設備
  add(): void {
    const value = this.newDeviceForm.getRawValue();
    this.deviceService.addDevice(value as unknown as INewDeviceRequest)
      .subscribe(res => {
        // 發布事件
        this.dialogClosed.emit();
      });
  }
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
  cannotEmpty(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value.trim() === '') {
      return of({ 'cannotEmpty': true });
    }
    return of(null);
  }
}
