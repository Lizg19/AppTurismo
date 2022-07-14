import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewplacespropietarioPage } from './viewplacespropietario.page';

const routes: Routes = [
  {
    path: '',
    component: ViewplacespropietarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewplacespropietarioPageRoutingModule {}
