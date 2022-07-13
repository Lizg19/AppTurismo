import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewadminPageRoutingModule } from './viewadmin-routing.module';

import { ViewadminPage } from './viewadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewadminPageRoutingModule
  ],
  declarations: [ViewadminPage]
})
export class ViewadminPageModule {}
