import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { IAddDevicePlaceRequest, unitListResponse } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-new-place-dialog',
  templateUrl: './new-place-dialog.component.html',
  styleUrls: ['./new-place-dialog.component.scss']
})
export class NewPlaceDialogComponent implements OnInit {
  get devicePlaceName() { return this.newPlaceForm.get('devicePlaceName'); }
  get deviceUnitGuid() { return this.newPlaceForm.get('deviceUnitGuid'); }

  unitData: unitListResponse[] = [];

  @Output() dialogClosed = new EventEmitter<void>();

  ngOnInit(): void {
    this.getUnitList();
    this.getUnitChange();
  }

  newPlaceForm = new FormGroup({
    deviceUnitGuid: new FormControl(''),
    devicePlaceName: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
      asyncValidators: [
        this.validate.bind(this),
        this.cannotEmpty.bind(this),
      ],
    }),
  });

  constructor(
    private unitService: UnitManageService,
  ) { }
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(1000),
      switchMap(value =>
        this.unitService.unitNameisExists(value).pipe(
          map(res => res.data === false ? { uniqueAlterEgo: true } : null),
          catchError(() => of(null))
        )));
  }

  cannotEmpty(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value === '') {
      return of({ 'cannotEmpty': true });
    }
    return of(null);
  }

  guid: string = '';
  getUnitList() {
    this.unitService.getTotalUnits().subscribe(res => {
      // console.log(res);
      this.unitData = res.data.unitList;
      console.log(this.unitData);
      // this.guid = this.unitData[0].deviceUnitGuid;
      // console.log(this.guid);
    });
  }

  getUnitChange(): void {
    // console.log(this.newPlaceForm.value);
    this.newPlaceForm.valueChanges.pipe(
      debounceTime(500),
      map(value => {
        this.guid = value.deviceUnitGuid ?? '';
        console.log(value.deviceUnitGuid);
        // if (value.unitNameFilter?.trim() != '') {
        //   this.unitService.getUnitPlace(value.unitNameFilter).subscribe(res => {
        //     this.unitData = res.data.unitList;
        //   });
        // }
      })
    ).subscribe();
  }

  addPlace(): void {
    const params = this.newPlaceForm.getRawValue();
    // this.unitService.
    //   console.log(this.deviceUnitGuid?.value);
    // console.log(params);
    this.unitService.addDevicePlace(params as unknown as IAddDevicePlaceRequest).subscribe(res => {
      // console.log(params);
      console.log(res);
      this.dialogClosed.emit();
    });
  }
}
