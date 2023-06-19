import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';
import { AnonymousRegisterComponent } from './anonymous-register/anonymous-register.component';
import { canActivateLogin, canActivateRegister } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AnonymousLoginComponent,
    data: { title: 'Login' },
    canActivate: [canActivateLogin],
  },
  {
    path: 'register',
    component: AnonymousRegisterComponent,
    data: { title: 'Register' },
    canActivate: [canActivateRegister],
  },

];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AnonymousRouterModule { }
