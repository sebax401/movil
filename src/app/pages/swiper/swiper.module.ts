import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SwiperPageRoutingModule } from './swiper-routing.module';

import { SwiperPage } from './swiper.page';
import { SharedModule } from 'src/app/shared/shared.module';

import { defineCustomElements } from '@teamhive/lottie-player/loader';

defineCustomElements(window);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperPageRoutingModule,
    SharedModule
  ],
  declarations: [SwiperPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwiperPageModule {}
