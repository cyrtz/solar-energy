import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../service/login/login.service';
import { ILoginRequest, IRegisterRequest } from '../models/login-form';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/login-dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDialogComponent } from '../dialog/register-dialog/register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  hide = true;
  loginForm = new FormGroup({
    userAccount: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
    ]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*'),
      Validators.minLength(4),
    ]),
  });

  registerForm = new FormGroup({
    userAccount: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]*'),
    ]),
    userEmail: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    userPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]*$'),
    ]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9]*'),
      Validators.minLength(4),
    ]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    localStorage.removeItem('token');
  }
  get userAccountLogin() { return this.loginForm.get('userAccount'); }
  get userPasswordLogin() { return this.loginForm.get('userPassword'); }
  get userEmail() { return this.registerForm.get('userEmail'); }
  get userAccount() { return this.registerForm.get('userAccount'); }
  get userPhone() { return this.registerForm.get('userPhone'); }
  get userPassword() { return this.registerForm.get('userPassword'); }


  login() {
    const value = this.loginForm.getRawValue();
    this.loginService.login(value as unknown as ILoginRequest).subscribe(res => {
      if (res.isSuccess === true) {
        localStorage.setItem('token', res.data);
        this.router.navigate(['/app-home']);
      } else {
        this.opneLoginDialog('0ms', '0ms');
      }
    });
  };

  register() {
    const value = this.registerForm.getRawValue();
    this.loginService.register(value as unknown as IRegisterRequest).subscribe(res => {
      // console.log(res);
      if (res.isSuccess === true) {
        this.openRegisterDialog('0ms', '0ms');
        localStorage.setItem('token', res.data);
      } else {
        this.snackBar.open(res.message, '關閉', {
          duration: 2000,
        });
      }
    });
  };

  opneLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  };

  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  };
}

