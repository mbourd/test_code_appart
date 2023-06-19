import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeRouterModule } from './home-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';



@NgModule({
  declarations: [
    HomeIndexComponent,
  ],
  imports: [
    SharedModule,
    HomeRouterModule,
    CommonModule
  ]
})
export class HomeModule { }
