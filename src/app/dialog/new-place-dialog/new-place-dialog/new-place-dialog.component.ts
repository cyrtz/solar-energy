import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-place-dialog',
  templateUrl: './new-place-dialog.component.html',
  styleUrls: ['./new-place-dialog.component.scss']
})
export class NewPlaceDialogComponent {
  newPlaceForm = new FormGroup({
    placeName: new FormControl('', Validators.required),
  });
}
