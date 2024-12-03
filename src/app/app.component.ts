import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device';
import { SqliteService } from './service/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public isWeb: boolean;
  public load: boolean;
  constructor(private platform: Platform,
              private sqlite: SqliteService) {
    this.isWeb = false;
    this.load = false;
    this.initApp();
  }

  initApp(){
    this.platform.ready().then(async () => {
     
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';

      this.sqlite.init();
      this.sqlite.dbReady.subscribe( load => {
      this.load = load;  
      })
      
      

    })
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
    this.image = 'data:image/jpeg;base64,${image.base64String}'!;
   }
  }
}
