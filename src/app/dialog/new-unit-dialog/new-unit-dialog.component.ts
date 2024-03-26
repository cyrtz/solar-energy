import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { INewUnitRequest } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent implements AsyncValidator {
  get deviceUnitName() { return this.newUnitForm.get('deviceUnitName'); }

  @Output() dialogClosed = new EventEmitter<void>();

  newUnitForm = new FormGroup({
    deviceUnitName: new FormControl('', {
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
  addUnit(): void {
    const params = this.newUnitForm.getRawValue();

    console.log(params);
    this.unitService.addUnit(params).subscribe(res => {
      // console.log(res);
      this.dialogClosed.emit();
    });
  }
}
