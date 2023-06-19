import { Injectable } from '@angular/core';
import { Pangolin } from '../models/Pangolin';

const USER_KEY = 'pangolin-user';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Pangolin {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return <Pangolin>JSON.parse(user);
    }

    return <Pangolin>{};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
