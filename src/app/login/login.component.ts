import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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

// export class SnackBarAnnotated{
//   durationInSeconds = 5;

//   constructor(private _snackBar: MatSnackBar) { }

//   openSnackBar() { 
//     this._snackBar
//   }
// }

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
    private snackBar: MatSnackBar,
  ) { }

  login() {
    const value = this.loginForm.getRawValue();
    this.loginService.login(value as unknown as ILoginRequest).subscribe(res => {
      if (res.isSuccess === true) {
        this.router.navigate(['/app-home']);
        // console.log(res);
      } else {
        this.opneLoginDialog('0ms', '0ms');
      }
      console.log(res);
    });
    // this.router.navigate(['/app-home'])

    // this.opneDialog('0ms', '0ms');
    // this.router.navigate(['/app-home'])
  };

  register() {
    const value = this.registerForm.getRawValue();
    this.loginService.register(value as unknown as IRegisterRequest).subscribe(res => {
      // console.log(res);
      if (res.isSuccess === true) {
        this.openRegisterDialog('0ms', '0ms');

      } else {
        this.snackBar.open(res.message, '關閉', {
          duration: 2000,
        });
      }
    });
  }
  opneLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

  };
  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });
  };
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

