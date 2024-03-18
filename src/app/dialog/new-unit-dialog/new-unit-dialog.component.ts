import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-unit-dialog',
  templateUrl: './new-unit-dialog.component.html',
  styleUrls: ['./new-unit-dialog.component.scss']
})
export class NewUnitDialogComponent {
  newUnitForm = new FormGroup({
    unitName: new FormControl('', Validators.required),
  });
}
