import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //declarar un modelo para obtener los input del login
  login:any={
   usuario:"",
   password:"" 
 }
 //defino una variable para indicar el campo vacío
 field:string="";
   constructor(public router:Router, public toastController:ToastController) { }
 
   ngOnInit() {
   }
   ingresar(){
     if(this.validateModel(this.login)){
       this.presentToast("top","Bienvenido/a "+this.login.usuario);
       //creo parámetro con NavigationExtras para llevar el modelo login al home
       let navigationExtras : NavigationExtras ={
         state: {login : this.login}
       };
       this.router.navigate(['/home'],navigationExtras);
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
 
