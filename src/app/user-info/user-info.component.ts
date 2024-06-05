import { Component, OnInit } from '@angular/core';
import { IAccountInfo } from '../models/account';
import { AccountService } from '../service/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditAccountDialogComponent } from '../dialog/edit-account-dialog/edit-account-dialog.component';

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
    private router: Router
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
  // 登出
  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    // 路由到登入頁面
    this.router.navigate(['']);
  }
  // 開啟編輯帳號對話框
  editAccountDialog(accountInfo: IAccountInfo): void {
    const dialogRef = this.dialog.open(EditAccountDialogComponent, {
      width: '500px',
      data: accountInfo,
    });
    // 訂閱 dialogClosed 事件
    dialogRef.componentInstance.dialogClosed.subscribe(() => {
    // 事件觸發時重新取得設備列表
      console.log('dialogClosed');
      this.getAccountInfo();
    });
  }
}
