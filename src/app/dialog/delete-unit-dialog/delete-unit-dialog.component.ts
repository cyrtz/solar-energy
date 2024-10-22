import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteUnitRequest, IUnitListResponse } from 'src/app/models/unit-manage';
import { UnitManageService } from 'src/app/service/unit-manage/unit-manage.service';

@Component({
  selector: 'app-delete-unit-dialog',
  templateUrl: './delete-unit-dialog.component.html',
  styleUrls: ['./delete-unit-dialog.component.scss']
})
export class DeleteUnitDialogComponent implements OnInit{

  device: string;
  deviceUnitName: string = '';

  @Output() dialogClosed = new EventEmitter<void>();

  constructor(
    private unitService: UnitManageService,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.device = data;
  };
  ngOnInit(): void {
    this.unitService.getUnits(0, 15).subscribe(
      res => {
        console.log(res);
        res.data.unitList.forEach(element => {
          if (element.deviceUnitGuid === this.device) {
            this.deviceUnitName = element.deviceUnitName;
          }
        });
      }
    );
  }
  delete(): void {
    
    const request: IDeleteUnitRequest = {
      deviceUnitGuid: this.device,
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
