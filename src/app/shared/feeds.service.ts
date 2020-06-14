import { Injectable, ɵConsole } from '@angular/core';
import { IFeedArt } from './feedart';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Flagged } from '../Admin/admin.interface';
import { Admin } from '../Admin/adminReg.interface';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedsService {

  private _getArticleUrl = "https://myteamworkproject.herokuapp.com/v1/feed";
  private _flagPost = "https://myteamworkproject.herokuapp.com/v1/flagged";
  private _registerUser = "https://myteamworkproject.herokuapp.com/v1/auth/users";
  private _getUsers = "https://myteamworkproject.herokuapp.com/v1/users";

  //anuglar behavioural subject
  public myData = new BehaviorSubject([]);
  public myFlag = new BehaviorSubject([]);
  public myUser = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getAllFeeds(): Observable<IFeedArt> {
    // console.log('Getting all feeds from the server.');
    return this.http.get<IFeedArt>(this._getArticleUrl);
  }
  updateFeeds(){
    this.getAllFeeds().subscribe(data => {
      this.myData.next(data.data);
    })
  }

  //Admin register a User
  registerUsers(firstName: string,lastName: string,email: string,password: string,
    gender:string,jobrole: string, dept: string,address: string,image: any): Observable<Admin> {
    let fd = new FormData();//using form data

    fd.append('firstName',firstName);
    fd.append('lastName', lastName);
    fd.append('email',email);
    fd.append('password',password);
    fd.append('gender', gender);
    fd.append('jobRole', jobrole);
    fd.append('dept', dept);
    fd.append('address', address);
    fd.append('image', image);

    return this.http.post<Admin>(this._registerUser, fd).pipe(
      tap(data => {
        // console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }
  // get all flagged posts
  getFlagged(): Observable<Flagged> { 
    return this.http.get<Flagged>(this._flagPost);
  }
  //method used to update the behavioural subject
  updateFlagged(){
    this.getFlagged().subscribe(flag => {
      this.myFlag.next(flag.data);
    })
  }

  //flag a post & unflag
  flagAPost(id: number,flag: string): Observable<any>{

    const url = `${this._flagPost}/${id}`;
    return this.http.post<any>(url, flag).pipe(
      tap(data => {
        // console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )
  }
  //getting all users
  getAllUsers():Observable<Admin[]>{
    return this.http.get<Admin[]>(this._getUsers);
  }
  //method used to update the behavioural subject
  updateUsers(){
    this.getAllUsers().subscribe(user =>{
      this.myUser.next(user);
    })
  }

  //used to handle error
  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }



}
