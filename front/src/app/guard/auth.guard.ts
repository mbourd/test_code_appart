import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivate();
};

export const canActivateLogin: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivateLogin();
};
export const canActivateRegister: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivateRegister();
};
