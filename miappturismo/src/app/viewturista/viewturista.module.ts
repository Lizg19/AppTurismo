import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewturistaPageRoutingModule } from './viewturista-routing.module';

import { ViewturistaPage } from './viewturista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewturistaPageRoutingModule
  ],
  declarations: [ViewturistaPage]
})
export class ViewturistaPageModule {}
