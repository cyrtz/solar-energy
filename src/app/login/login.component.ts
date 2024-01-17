import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  signinForm: FormGroup;
  signupForm: FormGroup;
  // signinForm: FormGroup | undefined;
  // signupForm: FormGroup | undefined;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      memberList: this.fb.array([]),
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signupForm = this.fb.group({
      memberList: this.fb.array([]),
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  
  }

  ngOnInit(): void {

    // this.signinForm = this.fb.group({
    //     memberList: this.fb.array([]),
    //     username: ['', Validators.required],
    //     password: ['', Validators.required],
    //   });
    //   this.signupForm = this.fb.group({
    //     memberList: this.fb.array([]),
    //     username: ['', Validators.required],
    //     password: ['', Validators.required],
    //   });

  }
  onSubmit(): void {
    console.log(this.signinForm?.value);
  }
  // 取得 FormArray
  get formArray(): FormArray {
    return this.signinForm?.get('memberList')! as FormArray;
  }
  // 判斷表單是否無效
  get isFormInvalid(): boolean {
    return this.formArray.controls.length ===0 || this.signinForm!.invalid;
  }
}
