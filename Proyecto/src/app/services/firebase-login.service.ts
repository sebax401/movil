import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private afAuth:AngularFireAuth,) { }

  loginFire(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
}
