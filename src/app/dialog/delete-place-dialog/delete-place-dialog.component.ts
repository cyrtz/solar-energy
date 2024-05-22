import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeletePlaceRequest, IPlaceListItem } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-delete-place-dialog',
  templateUrl: './delete-place-dialog.component.html',
  styleUrls: ['./delete-place-dialog.component.scss']
})
export class DeletePlaceDialogComponent {
  device: IPlaceListItem;

  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private unitService: UnitManageService,
    @Inject(MAT_DIALOG_DATA) public data: IPlaceListItem
  ) {
    this.device = data;
  };

  delete(): void {
    const request: IDeletePlaceRequest = {
      devicePlaceGuid: this.device.devicePlaceGuid,
    };

    console.log(request);

    this.unitService.deletePlace(request)
      .subscribe(
        res => {
          console.log(res);
          this.dialogClosed.emit();
        }
      );

  }

}
