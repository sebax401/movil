import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevamascotaPage } from './nuevamascota.page';

const routes: Routes = [
  {
    path: '',
    component: NuevamascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevamascotaPageRoutingModule {}
