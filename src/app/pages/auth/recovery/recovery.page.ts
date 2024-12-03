import { Component, OnInit } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {

  constructor(private emailComposer: EmailComposer){}

  email:string=''

  async sendEmail(){
    let correo: EmailComposerOptions = {
      to: this.email,
      cc: 'cabrerasebastian867@gmail.com',
      subject: 'recuperacion de contraseña',
      body: 'Para recuperar la contraseña ingrese al siguiente enlace adjunto',
      isHtml: true
    }
    await this.emailComposer.open(correo);
  }
  
  ngOnInit() {
  }

}
