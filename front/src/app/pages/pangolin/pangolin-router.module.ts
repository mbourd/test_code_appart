import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PangolinEditComponent } from './pangolin-edit/pangolin-edit.component';
import { authGuard } from 'src/app/guard/auth.guard';
import { PangolinShowComponent } from './pangolin-show/pangolin-show.component';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { PangolinFriendsComponent } from './pangolin-friends/pangolin-friends.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: PangolinEditComponent,
    data: { title: 'Edit' },
    canActivate: [authGuard],
  },
  {
    path: 'show/:id',
    component: PangolinShowComponent,
    data: { title: 'Show' },
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: PangolinProfileComponent,
    data: { title: 'Profile' },
    canActivate: [authGuard],
  },
  {
    path: 'friends',
    component: PangolinFriendsComponent,
    data: { title: 'Friends' },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class PangolinRouterModule {}
