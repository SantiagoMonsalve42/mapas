import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface marcadorColor{
  color: string,
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa-container{
    height: 100%;
    width: 100%;
  }
  .list-group{
    border-radius:5px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
  }
  li{
    cursor: pointer;
  }`
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapaPointers') divMapa!:ElementRef;
  listMarkers: marcadorColor[]=[];
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
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

    /*const marker= new mapboxgl.Marker()
                      .setLngLat(this.center)
                      .addTo(this.mapa);*/
    

    
  }

  randomizeColor(): string{
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    return color;
  }

  goToMarket(): void{

  }

  addMarket(): void{
    const color= this.randomizeColor();
    const newMarker = new mapboxgl
          .Marker({
            draggable: true,
            color
          }).setLngLat(this.center)
            .addTo(this.mapa);
    if(this.listMarkers.length < 8){
      this.listMarkers.push({color,marker: newMarker});  
    }else{
      this.listMarkers.splice(7,1);
      this.listMarkers.splice(0,0,{color,marker: newMarker});
    }
    
  }
}
