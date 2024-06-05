import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAccountInfo, IAccountUpdateRequest } from 'src/app/models/account';
import { AccountService } from 'src/app/service/account/account.service';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: './edit-account-dialog.component.html',
  styleUrls: ['./edit-account-dialog.component.scss']
})
export class EditAccountDialogComponent implements OnInit {
  accountInfo?: IAccountInfo;
  @Output() dialogClosed = new EventEmitter<void>();
  editAccountForm = new FormGroup({
    sysGuid: new FormControl(''),
    userName: new FormControl(''),
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
    userDepartment: new FormControl(''),
    userPosition: new FormControl(''),
  });
  get userEmail() { return this.editAccountForm.get('userEmail'); }
  get userPhone() { return this.editAccountForm.get('userPhone'); }

  constructor(
    public accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: IAccountInfo
  ) {
    this.accountInfo = data;
  }

  ngOnInit(): void {
    this.editAccountForm.patchValue({
      sysGuid: this.accountInfo?.sysGuid,
      userName: this.accountInfo?.userName,
      userEmail: this.accountInfo?.userEmail,
      userPhone: this.accountInfo?.userPhone,
      userDepartment: this.accountInfo?.userDepartment,
      userPosition: this.accountInfo?.userPosition,
    });
  }

  edit(): void {
    const value = this.editAccountForm.getRawValue();
    this.accountService.editAccountInfo(value as unknown as IAccountUpdateRequest)
      .subscribe(res => {
        // alert(res.message);
        alert('編輯成功');
        // 發布事件
        this.dialogClosed.emit();
      });
  }
}
