import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AnonymousRouterModule } from './anonymous-routing.module';
import { AnonymousLoginComponent } from './anonymous-login/anonymous-login.component';
import { AnonymousRegisterComponent } from './anonymous-register/anonymous-register.component';



@NgModule({
  declarations: [
    AnonymousLoginComponent,
  ],
  imports: [
    SharedModule,
    AnonymousRouterModule,
    CommonModule
  ]
})
export class AnonymousModule { }
