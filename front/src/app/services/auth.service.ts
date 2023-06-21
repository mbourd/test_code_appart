import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionstorageService } from './sessionstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_API: string = `${environment.API_URL}/auth`;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionstorageService,
    private router: Router
  ) {}

  canActivate() {
    const isLoggedIn: boolean = this.sessionStorageService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/']);
    }

    return isLoggedIn;
  }
  canActivateLogin() {
    const isLoggedIn: boolean = this.sessionStorageService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/pangolin/profile']);
    }

    return !isLoggedIn;
  }
  canActivateRegister() {
    const isLoggedIn: boolean = this.sessionStorageService.isLoggedIn();

    if (isLoggedIn) {
      this.router.navigate(['/pangolin/profile']);
    }

    return !isLoggedIn;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.AUTH_API}/signin`, {
      username,
      password,
    });
  }

  register(
    username: string,
    password: string,
    roles: string[]
  ): Observable<any> {
    return this.http.post(this.AUTH_API + '/signup', {
      username,
      password,
      roles,
    });
  }

  logout(): Observable<any> {
    return this.http.post(this.AUTH_API + '/signout', {});
  }
}
