import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from './login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  username: string;
  private _loginUrl = "https://myteamworkproject.herokuapp.com/v1/auth/signin";
  job: string;
  myAppendedUser: BehaviorSubject<any>;
  myUserImage: BehaviorSubject<any>;
  myFullname: BehaviorSubject<any>;
  myUsers: any;
  myUserImg: any;
  myUsername: Observable<any>;



  constructor(private http: HttpClient,private router:Router) {
    this.myAppendedUser = new BehaviorSubject(localStorage.getItem('Username'));
    this.myUserImage = new BehaviorSubject(localStorage.getItem('userImg'));
    this.myFullname = new BehaviorSubject(localStorage.getItem('fullname'));
    this.myUsers = this.myAppendedUser.asObservable();
    this.myUserImg = this.myUserImage.asObservable();
    this.myUsername = this.myFullname.asObservable();
  }

  getFullName(){
    if(localStorage.getItem('fullname') != null)
    return this.myFullname.value;
  }
  getUsername() {
    return this.myAppendedUser.value;
  }
  loginUser(user) {
    this.username = user;
    return this.http.post<IUser>(this._loginUrl, user);
  }
  logOutUser() {
    // remove user from local storage and set current user to null
    localStorage.clear();
    sessionStorage.clear();
    this.myAppendedUser.next(null);
    this.router.navigate(['/Login']);
  }
  getUserImage() {
    return this.myUserImage.value;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getJobRole() {
    const valid = true;
    this.job = localStorage.getItem('jobRole');
    if (this.job === 'admin' || this.job === 'Admin') {
      return valid;
    }
  }
}