import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let PostGuard = class PostGuard {
    canDeactivate(component, currentRoute, currentState, nextState) {
        if (component.imageForm.dirty) {
            return confirm('A navigation away from Image Post form will cause a loss in form data');
        }
        return true;
    }
};
PostGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], PostGuard);
export { PostGuard };
//# sourceMappingURL=post.guard.js.map