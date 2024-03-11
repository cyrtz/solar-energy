import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { DeviceManageService } from '../../service/device-manage/device-manage.service';
import { INewDeviceRequest } from '../../models/device-manage';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { Observable, catchError, map, of, pipe } from 'rxjs';

@Component({
  selector: 'app-new-device-dialog',
  templateUrl: './new-device-dialog.component.html',
  styleUrls: ['./new-device-dialog.component.scss']
})

export class NewDeviceDialogComponent implements AsyncValidator{

  // 定義一個"關閉事件"發布器
  @Output() dialogClosed = new EventEmitter<void>();

  newDeviceForm = new FormGroup({
    deviceName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [this.validate.bind(this)],
    }),
    deviceUnitName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    devicePlaceName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
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
}
