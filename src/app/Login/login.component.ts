import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { loginData } from './login.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  firstName: string;
  lastName: string;
  fullName: string;
  jobRole: string;

  model = new loginData('', '');
  name: string;
  isLogin: boolean;
  isloading: boolean;
  isError: boolean;


  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isloading = false;
    this.isLogin = false;
    this.isError = false;
  }
  loginUser() {
    this.isloading = true;
    this._auth.loginUser(this.model).subscribe(
      res => {
        
        if (res.status === 'success') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          this.firstName = res.data.userData[0].firstName;
          this.lastName = res.data.userData[0].lastName;
          this.jobRole = res.data.userData[0].jobRole;

          this.fullName = this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
          this.name = this.firstName + " " + this.lastName;

          localStorage.setItem('Username', this.fullName);
          localStorage.setItem('jobRole', this.jobRole);
          localStorage.setItem('fullname', this.name);

          
          //setting the value of the behavoural subject
          this._auth.myAppendedUser.next(this.fullName);

          localStorage.setItem('userImg', res.data.userData[0].userImage);
          this._auth.myUserImage.next(res.data.userData[0].userImage);
          this._auth.myFullname.next(this.name);

           //loading spinners and response
           this.isloading = false;
           this.isLogin = true;
           this.successLogin();
        }else{
           //loading spinners and response
           this.isloading = false;
           this.isError = true;
           this.errorLogin();
        }

      },
      err => {
         //loading spinners and response
         this.isloading = false;
         this.isError = true;
         this.errorLogin();
      }
    )
    // console.log(this.model);
  }

  isChecked(flag) {
    let valid = true;
    if (flag != 't') {
      valid = false;
    }
    return valid;
  }

  //removing the sucess modal after 3sec
  successLogin(): void {
    setTimeout(function () {
      this.isLogin = false;
      this.router.navigate(['/Home']);
    }.bind(this), 3000);
  }
  //removing the error modal after 3sec
  errorLogin(): void {
    setTimeout(function () {
      this.isError = false;
    }.bind(this), 3000);
  }
   //removing the error modal after 3sec
   network(): void {
    setTimeout(function () {
      this.isNetwork = false;
      this.isloading = false;
    }.bind(this), 3000);
  }
  loginsuccess = [{
    fontawesome: "fa fa-check-circle",
    message: "Login SuccessFully"
  }]

  loginerror = [{
    fontawesome: "fa fa-times-circle",
    message: "Username or Password Incorrect"
  }]
}
