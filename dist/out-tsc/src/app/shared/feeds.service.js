import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
let FeedsService = class FeedsService {
    constructor(http) {
        this.http = http;
        this._getArticleUrl = "https://myteamworkproject.herokuapp.com/v1/feed";
        this._flagPost = "https://myteamworkproject.herokuapp.com/v1/flagged";
        this._registerUser = "https://myteamworkproject.herokuapp.com/v1/auth/users";
        this._getUsers = "https://myteamworkproject.herokuapp.com/v1/users";
        //anuglar behavioural subject
        this.myData = new BehaviorSubject([]);
    }
    getAllFeeds() {
        console.log('Getting all feeds from the server.');
        return this.http.get(this._getArticleUrl);
    }
    updateFeeds() {
        this.getAllFeeds().subscribe(data => {
            this.myData.next(data.data);
        });
    }
    //-------------------------------------------
    //Admin register a User
    registerUsers(firstName, lastName, email, password, gender, jobrole, dept, address, image) {
        let fd = new FormData();
        fd.append('firstName', firstName);
        fd.append('lastName', lastName);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('gender', gender);
        fd.append('jobRole', jobrole);
        fd.append('dept', dept);
        fd.append('address', address);
        fd.append('image', image);
        return this.http.post(this._registerUser, fd).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    // get all flagged posts
    getFlagged() {
        return this.http.get(this._flagPost);
    }
    //flag a post & unflag
    flagAPost(id, flag) {
        const url = `${this._flagPost}/${id}`;
        return this.http.post(url, flag).pipe(tap(data => console.log(JSON.stringify(data))), catchError(this.handleError));
    }
    //getting all users
    getAllUsers() {
        return this.http.get(this._getUsers);
    }
    handleError(err) {
        let errorMessage;
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
};
FeedsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], FeedsService);
export { FeedsService };
//# sourceMappingURL=feeds.service.js.map