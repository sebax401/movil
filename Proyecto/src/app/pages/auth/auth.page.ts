import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
    usuario:string=""
    email:string=""
    password:string=""

  login:any={
    usuario:"", 
  }

  field:string="";

  constructor(public router:Router, public toastController:ToastController,private loginFirebase: FirebaseLoginService) { }

  ngOnInit() {
 }  //declarar un modelo para obtener los input del login

   ingresar(){
    if(this.validateModel(this.login)){
      this.loginFirebase.loginFire(this.email,this.password).then(()=>{
        this.router.navigate(['/home'],navigationExtras).catch(()=>{
          this.presentToast("top","Bienvenido/a"+this.login.usuario);
        })
      }).catch(()=>{
        this.presentToast("middle", "ingrese los datos correctos para ingresar");
      })
      //creo parámetro con NavigationExtras para llevar el modelo login al home
      let navigationExtras : NavigationExtras ={
        state: {login : this.login}
      };
    }else{
      this.presentToast("top","Ingrese: "+this.field+" para continuar",5000);
    }    
  }
  /**
     * validateModel sirve para validar que se ingrese algo en los
     * campos del html mediante su modelo
     */
  validateModel(model:any){
    //Recorro el modelo 'login' revisando las entradas del Object
    for(var [key,value] of Object.entries(model)){
      //si un valor es "" retorno falso e indico el nombre del campo que falta
      if(value == ""){
        //rescato el nombre del campo vacío
        this.field = key;
        return false;
      }
    }
    return true;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });

    await toast.present();
  }
}
