import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { loginData } from './login.model';
let LoginComponent = class LoginComponent {
    constructor(_auth, router) {
        this._auth = _auth;
        this.router = router;
        this.model = new loginData('', '');
    }
    ngOnInit() {
    }
    loginUser() {
        this._auth.loginUser(this.model).subscribe(res => {
            console.log(res);
            if (res.status === 'success') {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userId);
                this.firstName = res.data.userData[0].firstName;
                this.lastName = res.data.userData[0].lastName;
                this.jobRole = res.data.userData[0].jobRole;
                this.fullName = this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
                localStorage.setItem('Username', this.fullName);
                localStorage.setItem('jobRole', this.jobRole);
                this.router.navigate(['/Home'], {
                    queryParams: { refresh: new Date().getTime() }
                });
            }
        }, err => console.log(err));
        console.log(this.model);
    }
    isChecked(flag) {
        let valid = true;
        if (flag != 't') {
            valid = false;
        }
        return valid;
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map