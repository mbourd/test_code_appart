import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PangolinRouterModule } from './pangolin-router.module';
import { PangolinEditComponent } from './pangolin-edit/pangolin-edit.component';
import { PangolinShowComponent } from './pangolin-show/pangolin-show.component';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { PangolinFriendsComponent } from './pangolin-friends/pangolin-friends.component';
import { AnonymousRegisterComponent } from '../anonymous/anonymous-register/anonymous-register.component';



@NgModule({
  declarations: [
    PangolinShowComponent,
    PangolinEditComponent,
    PangolinProfileComponent,
    PangolinFriendsComponent,
    AnonymousRegisterComponent,
  ],
  imports: [
    SharedModule,
    PangolinRouterModule,
    CommonModule
  ]
})
export class PangolinModule { }
