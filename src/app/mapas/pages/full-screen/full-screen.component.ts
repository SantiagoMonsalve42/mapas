import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [ `
  #mapa{
    height: 100%;
    width: 100%;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {
  
 
  constructor() { }

  ngOnInit(): void {
    this.inicializarMapa();
  }

  inicializarMapa(): void{
 
    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0692687695204,4.612287333389066],
    zoom: 14
    });
    
  }

}
