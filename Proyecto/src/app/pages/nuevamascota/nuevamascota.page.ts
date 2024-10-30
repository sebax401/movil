import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nuevamascota',
  templateUrl: './nuevamascota.page.html',
  styleUrls: ['./nuevamascota.page.scss'],
})
export class NuevamascotaPage implements OnInit {
  data: any = {}

  constructor(private apiService: ApiService) { }

  ngOnInit() {
   this.llenarData()
  }
  
  llenarData(){
    this.apiService.getData().subscribe(data => {
      this.data = data
      console.log(this.data);
    })
  }

}
