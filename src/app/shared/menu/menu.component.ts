import { Component, OnInit } from '@angular/core';

interface items{
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `li{
      cursor: pointer;
    }`
  ]
})
export class MenuComponent{

  listItems: items[]=[
    {ruta:'/maps/fullscreen', nombre:'Full Screen'},
    {ruta:'/maps/marcadores', nombre:'Points'},
    {ruta:'/maps/zoom-range', nombre:'Zoom Range'},
    {ruta:'/maps/propiedades', nombre:'Properties'},
  ];

  constructor() { }


}
