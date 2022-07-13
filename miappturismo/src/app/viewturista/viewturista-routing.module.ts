import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewturistaPage } from './viewturista.page';

const routes: Routes = [
  {
    path: '',
    component: ViewturistaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewturistaPageRoutingModule {}
