import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpropietarioPage } from './viewpropietario.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpropietarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpropietarioPageRoutingModule {}
