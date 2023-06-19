import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SessionstorageService } from '../services/sessionstorage.service';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private notification: NzNotificationService,
    private sessionService: SessionstorageService,
    private router: Router
  ) {}

  /**
   * Intercept errors
   * @param req
   * @param next
   * @returns
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.error(error);

        this.notification.error(error.error.titleExc, error.error.message);

        if (error.status === 401) {
          if (error.error.message.includes('Authentification échoué')) {
            this.router.navigate(['/auth/login']);
          } else if (error.error.message.includes('Session expiré')) {
            this.sessionService.clean();
            this.router.navigate(['/auth/login']);
          } else {
            this.router.navigate(['/']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}

export const httpErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];
