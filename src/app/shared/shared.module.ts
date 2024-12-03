import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [HeaderComponent, LogoComponent, FooterComponent],
  exports: [HeaderComponent, LogoComponent, FooterComponent],
  imports: [
    CommonModule, IonicModule,ReactiveFormsModule,FormsModule
  ]
})
export class SharedModule { }
