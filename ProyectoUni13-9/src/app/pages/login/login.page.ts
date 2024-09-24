import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login:any={
   usuario:"",
   password:"" 
 }
 field:string="";
   constructor(public router:Router, public toastController:ToastController) { }
 
   ngOnInit() {
   }
   ingresar(){
     if(this.validateModel(this.login)){
       this.presentToast("top","Bienvenido/a "+this.login.usuario);
       let navigationExtras : NavigationExtras ={
         state: {login : this.login}
       };
       this.router.navigate(['/home'],navigationExtras);
     }else{
       this.presentToast("top","Ingrese: "+this.field+" para continuar",5000);
     }    
   }
   validateModel(model:any){
     for(var [key,value] of Object.entries(model)){
       if(value == ""){
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
 
