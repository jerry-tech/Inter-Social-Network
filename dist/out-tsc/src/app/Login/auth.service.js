import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this._loginUrl = "https://myteamworkproject.herokuapp.com/v1/auth/signin";
    }
    loginUser(user) {
        this.username = user;
        return this.http.post(this._loginUrl, user);
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
};
AuthService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map