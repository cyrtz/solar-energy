import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { INewUnitRequest } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent {
  get unitName() { return this.newUnitForm.get('unitName'); }

  newUnitForm = new FormGroup({
    deviceUnitName: new FormControl('', Validators.required),
  });

  constructor(
    private unitService: UnitManageService,
  ) { }

  addUnit(): void {
    const params = this.newUnitForm.getRawValue();
    
    console.log(params);
    this.unitService.addUnit(params).subscribe( res => {
      // console.log(value);
      console.log(res);
    });
  }
}
