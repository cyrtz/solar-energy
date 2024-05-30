import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { IAccountInfo } from '../models/account';
import { AccountService } from '../service/account/account.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  token = localStorage.getItem('token');
  accountInfo?: IAccountInfo;
  
  constructor(
    private accountService: AccountService,
    public dialog: MatDialog,
  ){}
  
  ngOnInit(): void {
    this.getAccountInfo();
  }
  // 取得帳號資訊
  getAccountInfo(){
    this.accountService.getAccountInfo().subscribe(res => {
      this.accountInfo = res.data;
    })
  }
  // // 開啟編輯帳號對話框
  // editAccountDialog(enterAnimationDuration: string, exitAnimationDuration: string, device: deviceListRes): void {
  //   const dialogRef = this.dialog.open(EditDeviceDialogComponent, {
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //     width: '500px',
  //     data: device,
  //   });
  //   // 訂閱 dialogClosed 事件
  //   dialogRef.componentInstance.dialogClosed.subscribe(() => {
  //   // 事件觸發時重新取得設備列表
  //     console.log('dialogClosed');
  //     this.getAccountInfo();
  //   });
  // }
}
