import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteUnitRequest, unitListResponse } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-delete-unit-dialog',
  templateUrl: './delete-unit-dialog.component.html',
  styleUrls: ['./delete-unit-dialog.component.scss']
})
export class DeleteUnitDialogComponent {

  device: unitListResponse;

  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private unitService: UnitManageService,
    @Inject(MAT_DIALOG_DATA) public data: unitListResponse
  ) {
    this.device = data;
  };

  delete(): void {
    const request: IDeleteUnitRequest = {
      deviceUnitGuid: this.device.deviceUnitGuid,
    };

    console.log(request);

    this.unitService.deleteUnit(request)
      .subscribe(
        res => {
          console.log(res);
          this.dialogClosed.emit();
        }
      );

  }
}  
