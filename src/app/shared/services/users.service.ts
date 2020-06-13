import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {IUser} from "src/app/shared/models/iuser"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://krishnaawk-001-site1.itempurl.com/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FirstName: [''],
    LastName:[''],
    MobileNo:[''],
    Role:[''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }
  register() {
    var reMatch =/^([^@]*)@/;
    var email=this.formModel.value.Email;
    if(this.formModel.value.UserName ==null){
      this.formModel.value.UserName =email.substring(0,email.indexOf("@"));
    }
    var body = {
      UserName: this.formModel.value.UserName,
      Email: email,
      FirstName: this.formModel.value.FirstName,
      LastName: this.formModel.value.LastName,
      MobileNo:this.formModel.value.MobileNo,
      Password: this.formModel.value.Passwords.Password,
      Role:this.formModel.value.Role
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/Login', formData);
  }

  getUserProfile(): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.BaseURI + '/User/GetAllUserDetails');
  }

  getUserStatus(userdata){

    return this.http.post(this.BaseURI + '/User/GetUserStatus',userdata)
  }

}
