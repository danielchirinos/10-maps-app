import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

// la instancia del mapa se movio al modulo para usarla en todos lados
// import * as mapboxgl from 'mapbox-gl';
// (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGFuaWVsY2hpcmlub3MiLCJhIjoiY2xtc2c5ZW9hMGZ0aDJqcGpmb2c0cGNwdiJ9.CHLIl_m0NX0kddww7vZsXg';



@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

    @ViewChild("map") divMap?: ElementRef;

    // se hace aqui para tener todo despues que la vista este inicializada
    ngAfterViewInit(): void {

        if(!this.divMap) throw "No se encontro el div del mapa"
        
        const map = new Map({
            container: this.divMap.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: [-70.7057444, -33.4558354], // starting position [lng, lat]
            zoom: 11, // starting zoom
        });
    }

}
