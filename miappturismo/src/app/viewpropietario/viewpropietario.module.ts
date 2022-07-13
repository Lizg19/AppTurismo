import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpropietarioPageRoutingModule } from './viewpropietario-routing.module';

import { ViewpropietarioPage } from './viewpropietario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpropietarioPageRoutingModule
  ],
  declarations: [ViewpropietarioPage]
})
export class ViewpropietarioPageModule {}
