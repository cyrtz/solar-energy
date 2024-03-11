import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, catchError, map, of } from 'rxjs';
import { IEditDeviceRequest, deviceListRes } from 'src/app/models/device-manage';
import { DeviceManageService } from 'src/app/service/device-manage/device-manage.service';

@Component({
  selector: 'app-edit-device-dialog',
  templateUrl: './edit-device-dialog.component.html',
  styleUrls: ['./edit-device-dialog.component.scss']
})
export class EditDeviceDialogComponent implements OnInit{
  // 接收從父元件傳遞的設備數據
  device: deviceListRes;

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  editDeviceForm = new FormGroup({
    deviceOldName: new FormControl(''),
    deviceName: new FormControl('',{
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.validate.bind(this),
        this.cannotEmpty.bind(this),
      ],
    }),
    deviceUnitName: new FormControl('',{
      validators:[
      Validators.required,
      Validators.minLength(2),
    ],
    asyncValidators: [
      this.cannotEmpty.bind(this),
    ]}),
    devicePlaceName: new FormControl('',{
      validators:[
      Validators.required,
      Validators.minLength(2),
    ],
    asyncValidators: [
      this.cannotEmpty.bind(this),
    ]}),
  })
  get deviceName() { return this.editDeviceForm.get('deviceName'); }
  get deviceUnitName() { return this.editDeviceForm.get('deviceUnitName'); }
  get devicePlaceName() { return this.editDeviceForm.get('devicePlaceName'); }

  constructor(
    private deviceService: DeviceManageService,
    @Inject(MAT_DIALOG_DATA) public data: deviceListRes
    ) {
      this.device = data;
    }
    ngOnInit(): void {
      this.editDeviceForm.patchValue({
        deviceOldName: this.device.deviceName,
        deviceName: '',
        deviceUnitName: this.device.deviceUnitName,
        devicePlaceName: this.device.devicePlaceName,
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
