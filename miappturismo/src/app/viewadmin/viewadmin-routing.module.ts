import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewadminPage } from './viewadmin.page';

const routes: Routes = [
  {
    path: '',
    component: ViewadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewadminPageRoutingModule {}
