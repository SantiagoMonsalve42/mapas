import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
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
  }
  `
  ]
})
export class ZoomRangeComponent implements OnDestroy,AfterViewInit {

  @ViewChild('mapa') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 12;
  center: [number,number]=[-74.0692687695204,4.612287333389066];

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', ()=>{});
    this.map.off('zoomend', ()=>{});
    this.map.off('move', ()=>{});
  }

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  inicializarMapa(): void{
 
    this.map = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    this.map.on('zoom',(_)=>{
      this.zoomLevel=this.map.getZoom();
    });
    
    this.map.on('zoomend', (_)=>{
      if(this.map.getZoom() > 18){
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (event)=>{
      const targer=event.target;
      const {lng,lat} = targer.getCenter();
      this.center=[lng,lat];
    })
    
  }

  zoom(validator: boolean): void{
    (validator) ? this.map.zoomIn():this.map.zoomOut();
  }

  zoomCambio(valor:string){
    this.map.zoomTo(Number(valor));
  }

}
