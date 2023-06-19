import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorRouterModule } from './error-routing.module';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';

@NgModule({
  declarations: [
    ErrorNotFoundComponent
  ],
  imports: [
    SharedModule,
    ErrorRouterModule,
    CommonModule
  ]
})
export class ErrorModule { }
