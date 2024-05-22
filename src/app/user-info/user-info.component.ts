import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
  token = localStorage.getItem('token');
  accountInfo: any;
  
  constructor(
    private loginService: LoginService,
  ){}
  
  ngOnInit(): void {
    this.getAccountInfo();
  }
  getAccountInfo(){
    this.loginService.getAccountInfo().subscribe(res => {
      this.accountInfo = res
    })
  }
}
