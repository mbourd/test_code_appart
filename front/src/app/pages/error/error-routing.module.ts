import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorNotFoundComponent,
    data: {title: 'Not found'}
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class ErrorRouterModule {}
