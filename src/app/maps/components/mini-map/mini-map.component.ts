import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {
    
    @Input() lngLat?: [ number, number ]
    @ViewChild("map") divMap?: ElementRef;

    public zoom: number = 10;
    public map?: Map;
    
    ngAfterViewInit(): void {

        if( !this.divMap ) throw "No se encontro el div del mapa"
        if( !this.lngLat ) throw "no llego la lng y lat"

        const map = new Map({
            container: this.divMap.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.lngLat, // starting position [lng, lat]
            zoom: this.zoom, // starting zoom
            interactive: false
        });

        new Marker()
        .setLngLat( this.lngLat )
        .addTo ( map )

    }


}
