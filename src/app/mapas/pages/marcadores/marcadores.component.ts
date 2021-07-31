import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    height: 100%;
    width: 100%;
  }
  .row{
    background-color:white;
    border-radius:5px;
    position: fixed;
    bottom: 50px;
    left: 50px;
    padding: 10px;
    z-index:999;
    width: 400px;
  }`
  ]
})
export class MarcadoresComponent implements AfterViewInit {
  
  @ViewChild('mapaPointers') divMapa!:ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 12;
  center: [number,number]=[-74.0692687695204,4.612287333389066];


  constructor() { }
 
  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  inicializarMapa(): void{
 
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });
    
  }
}
