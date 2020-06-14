import { Injectable, Inject, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable(
)
export class TokenInterceptorService implements HttpInterceptor {
  content: string;

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log(`AddHeaderInterceptor - ${req.url}`);//subject to removal
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
}
