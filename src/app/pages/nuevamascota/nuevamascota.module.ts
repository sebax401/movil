import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevamascotaPageRoutingModule } from './nuevamascota-routing.module';

import { NuevamascotaPage } from './nuevamascota.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevamascotaPageRoutingModule,
    SharedModule
  ],
  declarations: [NuevamascotaPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NuevamascotaPageModule {}
