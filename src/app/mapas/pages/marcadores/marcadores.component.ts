import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface marcadorColor{
  color: string,
  marker?: mapboxgl.Marker;
  centro?: [number,number]
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
     this.leerLocalStorage();
  }

  randomizeColor(): string{
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    return color;
  }

  goToMarket(marker: mapboxgl.Marker): void{
    this.mapa.flyTo({
      center: marker!.getLngLat(),
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    this.guardarLocalStorage();
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
    this.guardarLocalStorage();
    
    newMarker.on('dragend',()=>{
      this.guardarLocalStorage();
    })
  }

  delete(index: number): void{
    
    this.listMarkers[index].marker?.remove();
    this.listMarkers.splice(index,1);
    this.guardarLocalStorage();

  }

  guardarLocalStorage(): void{
    const lngLatArray: marcadorColor[]=[];

    this.listMarkers.forEach(m =>{
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArray.push({
        color,
        centro: [lng,lat]
      });

    });

    localStorage.setItem("marcadores",JSON.stringify(lngLatArray));

  }

  leerLocalStorage():void{
    if(!localStorage.getItem("marcadores")){
      return;
    }
    const lngLatArray: marcadorColor[]= JSON.parse(localStorage.getItem("marcadores")!);
    lngLatArray.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.listMarkers.push({
        marker: newMarker,
        color: m.color
      });
      newMarker.on('dragend',()=>{
        this.guardarLocalStorage();
      })
    });

  }

}
