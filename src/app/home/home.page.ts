import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, Animation } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { SqliteService } from '../service/sqlite.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public language: string;
  public languages: string[];

  @ViewChild('animacion',{read:ElementRef, static:true}, )
  animacion!:ElementRef;

  @ViewChild('animacion2',{read:ElementRef, static:true})
  animacion2!:ElementRef;

  

  animation!:Animation
  
  login:any;
  constructor(public alertController:AlertController,
              private activatedRoute: ActivatedRoute,
              private router : Router, private animationController: AnimationController,
              private sqlite: SqliteService) {

    this.language = '';
    this.languages = [];
    //recibo el parámetro y lo asigno a una variable que pueda recibir el valor
    this.activatedRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.login = this.router.getCurrentNavigation()?.extras?.state?.['login']; 
        console.log(this.login);
      }
    });
  }
  ngAfterViewInit() {
    const animarTitulo = this.animationController
    .create()
    .addElement(this.animacion.nativeElement)
    .duration(6000)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, color: 'red' },
      { offset: 0.25,  color: 'var (--color)'},
      { offset: 0.5, color: 'blue' },
      { offset: 0.75,  color: 'var (--color)'},
      { offset: 1, color: 'red' }
    ]);

    const animarSub = this.animationController
    .create()
    .addElement(this.animacion2.nativeElement)
    .duration(6000)
    .iterations(Infinity)
    .keyframes([
      { offset: 0, color: 'yellow' },
      { offset: 0.25,  color: 'var (--color)'},
      { offset: 0.5, color: 'green' },
      { offset: 0.75,  color: 'var (--color)'},
      { offset: 1, color: 'yellow' }
    ]);

  


    this.animation = this.animationController
    .create()
    .duration(3000)
    .iterations(Infinity)
    .addAnimation([animarTitulo, animarSub]);

    this.animation.play();
  }
  
  image= '';

  async captureImage(){
    const image = await Camera.getPhoto({
     quality: 90,
     allowEditing: true,
     source: CameraSource.Prompt,
     resultType: CameraResultType.Base64
    });
 
    if (image) {
     this.image = `data:image/jpeg;base64,${image.base64String}`!;
    }
  }
   
   ionViewWillEnter(){
    this.read();
   }

  create(){
    this.sqlite.create(this.language.toUpperCase()).then( (changes) => {
      console.log(changes);
      console.log("Creado");
    }).catch(err => {
      console.error(err);
      console.error("Error al Crear");
    })
  }
  
  read(){
    this.sqlite.read().then((languages: string[]) => {
      this.languages = languages;
      console.log("Leido");
      console.log(this.languages);
    } ).catch(err => {
      console.error(err);
      console.error("Error al Leer");
    })
  }

  update(language: string){
    this.sqlite.update(this.language.toUpperCase(), language).then( (changes) =>{
      console.log(changes);
      console.log("Actualizado");
      this.read();
    }).catch(err => {
      console.error(err);
      console.error("Error al Actualizar");
    })
    
  }

  delete(language: string){
    this.sqlite.delete(language).then( (changes) =>{
      console.log(changes);
      console.log("Borrado");
      this.read();
    }).catch(err => {
      console.error(err);
      console.error("Error al Borrar");
    })
  }

}
