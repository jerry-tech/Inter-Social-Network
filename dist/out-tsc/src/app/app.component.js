import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { slideInAnimation } from './app.animation';
let AppComponent = class AppComponent {
    constructor(router, authservice) {
        this.router = router;
        this.authservice = authservice;
        this.title = 'teamworkUI';
        this.showLoadingIndicator = true;
        router.events.subscribe((routerEvent) => {
            this.checkRouterEvent(routerEvent);
        });
    }
    ngOnInit() {
        this.getLocalName = localStorage.getItem('Username');
        console.log(this.getLocalName);
        if (this.getLocalName != null) {
            this.username = this.getLocalName;
            this.getLocalName = null;
        }
        else {
            this.getLocalName = "No Network or login";
        }
    }
    w3_open() {
        document.getElementById("mySidebar").style.display = "block";
    }
    w3_close() {
        document.getElementById("mySidebar").style.display = "none";
    }
    logout() {
        localStorage.clear();
        location.reload();
    }
    checkRouterEvent(routerEvent) {
        if (routerEvent instanceof NavigationStart) {
            this.showLoadingIndicator = true;
        }
        if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
            this.showLoadingIndicator = false;
        }
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css'],
        animations: [slideInAnimation]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map