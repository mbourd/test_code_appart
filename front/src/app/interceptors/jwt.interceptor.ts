import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionstorageService } from '../services/sessionstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionstorageService) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    return req.clone({ setHeaders: { 'x-access-token': token } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
    });

    // if (this.sessionService.isLoggedIn()) {
    //   return next.handle(this.addToken(req, this.sessionService.getToken()));
    // }

    return next.handle(req);
  }
}

export const jwtInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
