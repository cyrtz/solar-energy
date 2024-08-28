import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IAccountInfo, IAccountUpdateRequest } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  accountInfo?: IAccountInfo;
  editAccountForm = new FormGroup({
    sysGuid: new FormControl(''),
    userEmail: new FormControl('', {
      validators: [
        Validators.email
      ]
    }),
    userPhone: new FormControl('', {
      validators: [
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$'),
      ]
    }),
  });
  get userEmail() { return this.editAccountForm.get('userEmail'); }
  get userPhone() { return this.editAccountForm.get('userPhone'); }

  constructor(
    public accountService: AccountService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: IAccountInfo
  ) {
    this.accountInfo = data;
  }
  
  @Output() dialogClosed = new EventEmitter<void>();
  ngOnInit(): void {
    this.editAccountForm.patchValue({
      sysGuid: this.accountInfo?.sysGuid,
      userEmail: this.accountInfo?.userEmail,
      userPhone: this.accountInfo?.userPhone,
    });
  }
  edit(): void {
    const value = this.editAccountForm.getRawValue();
    this.accountService.editAccountInfo(value as unknown as IAccountUpdateRequest)
      .subscribe(res => {
        this.openSnackBar('編輯成功', '關閉');
        this.dialogClosed.emit();
      });
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000,
    });
  }
}
