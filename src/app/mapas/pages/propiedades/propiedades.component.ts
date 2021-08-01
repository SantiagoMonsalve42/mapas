import { Component} from '@angular/core';
interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}
@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styles: [
  ]
})
export class PropiedadesComponent{

  propiedades: Propiedad[] = [
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'Facultad tecnológica',
      lngLat: [  -74.15769309217347,4.57951906416745]
    },
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'Sede Bosa',
      lngLat: [ -74.18576684681693,4.638013975650578]
    },
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'Sede Macarena',
      lngLat: [-74.06562097992595, 4.613567858589045  ]
    },
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'Sede Vivero',
      lngLat: [  -74.06337782773896,4.597104970649915 ]
    },
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'facultad de Ingenieria',
      lngLat: [ -74.06542941294781,4.628076138210932 ]
    },
    {
      titulo: 'Universidad distrital FJDC',
      descripcion: 'Facultad de artes',
      lngLat: [ -74.07815157570171, 4.6044309136968655]
    },
  ]

  constructor() { }

  

}
