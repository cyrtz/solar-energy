import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPlaceDialogComponent } from '../dialog/new-place-dialog/new-place-dialog/new-place-dialog.component';

@Component({
  selector: 'app-place-manage',
  templateUrl: './place-manage.component.html',
  styleUrls: ['./place-manage.component.scss']
})
export class PlaceManageComponent {

  constructor(
    public dialog: MatDialog,
  ) { }

  newDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(NewPlaceDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      width: '500px',
    });
  }
}
