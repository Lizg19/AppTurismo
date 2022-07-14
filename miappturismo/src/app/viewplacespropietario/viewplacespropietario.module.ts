import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewplacespropietarioPageRoutingModule } from './viewplacespropietario-routing.module';

import { ViewplacespropietarioPage } from './viewplacespropietario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewplacespropietarioPageRoutingModule
  ],
  declarations: [ViewplacespropietarioPage]
})
export class ViewplacespropietarioPageModule {}
