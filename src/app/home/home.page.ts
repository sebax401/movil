import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController, Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('animacion',{read:ElementRef, static:true}, )
  animacion!:ElementRef;

  @ViewChild('animacion2',{read:ElementRef, static:true})
  animacion2!:ElementRef;

  animation!:Animation
  
  login:any;
  constructor(public alertController:AlertController,
              private activatedRoute: ActivatedRoute,
              private router : Router, private animationController: AnimationController,) {
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
  
}
