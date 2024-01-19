import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { ILoginRequest, IRegisterRequest } from '../models/login-form';
import { Router } from '@angular/router';

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
  ) { }

  login() {
    const value = this.loginForm.getRawValue();
    this.loginService.login(value as unknown as ILoginRequest).subscribe(res => {
      if (res.isSuccess === true ) {
        // this.router.navigate(['/app-home']);
        console.log(res);
      } else {
        // alert(res.message);
        console.log(res);
      }
      console.log(res);
    });
  }

  register() {
    const value = this.registerForm.getRawValue();

    this.loginService.register(value as unknown as IRegisterRequest).subscribe(res => {
      console.log(res);
    });
  }

}
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

