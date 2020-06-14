import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AdminGuard = class AdminGuard {
    canDeactivate(component, currentRoute, currentState, nextState) {
        if (component.adminRegister.dirty) {
            const AdminForm = component.adminRegister.value;
            return confirm('Navigation away from registration form will cause a loss in form data');
        }
        return true;
    }
};
AdminGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], AdminGuard);
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map