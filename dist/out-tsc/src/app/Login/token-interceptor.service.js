import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
let TokenInterceptorService = class TokenInterceptorService {
    constructor(injector) {
        this.injector = injector;
    }
    intercept(req, next) {
        console.log(`AddHeaderInterceptor - ${req.url}`); //subject to removal
        let authService = this.injector.get(AuthService);
        let token = authService.getToken();
        let tohenizedReq = req.clone({
            //     setHeaders: {
            //   'token': token || ''
            // }
            headers: req.headers.set('token', token || ''),
        });
        return next.handle(tohenizedReq);
    }
};
TokenInterceptorService = tslib_1.__decorate([
    Injectable()
], TokenInterceptorService);
export { TokenInterceptorService };
//# sourceMappingURL=token-interceptor.service.js.map