import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ILoginRequest, IRegisterRequest } from '../models/login-form';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    userAccount: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
  });

  registerForm = new FormGroup({
    userAccount: new FormControl('', Validators.required),
    userPassword: new FormControl('', Validators.required),
    userPhone: new FormControl('', Validators.required),
    userEmail: new FormControl('', Validators.required),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  login() {
    const value = this.loginForm.getRawValue();
    this.loginService.login(value as unknown as ILoginRequest).subscribe(res => {
      if (res.isSuccess === true) {
        this.router.navigate(['/app-home']);
        // console.log(res);
      } else {
        this.opneDialog('0ms', '0ms');
      }
      console.log(res);
    });
    // this.opneDialog('0ms', '0ms');
  };

  register() {
    const value = this.registerForm.getRawValue();

    this.loginService.register(value as unknown as IRegisterRequest).subscribe(res => {
      console.log(res);
    });
  }
  opneDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

  };
  // onSubmit(): void {
  //   console.log(this.signinForm?.value);
  // }
  // 取得 FormArray
  // get formArray(): FormArray {
  //   return this.signinForm?.get('memberList')! as FormArray;
  // }
  // 判斷表單是否無效
  // get isFormInvalid(): boolean {
  //   return this.formArray.controls.length ===0 || this.signinForm!.invalid;
  // }
};
