import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module';
import { HomeIndexComponent } from './home-index/home-index.component';

const routes: Routes = [
  {
    path: '',
    component: HomeIndexComponent,
    data: { title: 'Accueil' },
    canActivate: [],
  },

];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class HomeRouterModule { }