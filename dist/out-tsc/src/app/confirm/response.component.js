import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let modal = document.getElementById("modalcontent");
modal.style.display = 'block';
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
let ResponseComponent = class ResponseComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
};
tslib_1.__decorate([
    Input()
], ResponseComponent.prototype, "response", void 0);
ResponseComponent = tslib_1.__decorate([
    Component({
        selector: 'app-response',
        templateUrl: './response.component.html',
        styleUrls: ['./response.component.css']
    })
], ResponseComponent);
export { ResponseComponent };
//# sourceMappingURL=response.component.js.map