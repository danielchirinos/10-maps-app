import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
    color: string;
    marker: Marker;
}

interface PlainMarker {
    color: string;
    lngLat: number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
    

    @ViewChild("map") divMap?: ElementRef;

    public zoom: number = 13;
    public map?: Map;
    public currenCenter: LngLat = new LngLat(-70.7057444, -33.4558354);
    public markers: MarkerAndColor[] = [];
    
    ngAfterViewInit(): void {


        if(!this.divMap) throw "No se encontro el div del mapa"
        
        this.map = new Map({
            container: this.divMap.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.currenCenter, // starting position [lng, lat]
            zoom: this.zoom, // starting zoom
        });

        this.readToLocalStorage()

        // const markerHtml = document.createElement("div");
        // markerHtml.innerHTML = "Daniel"

        // const marker = new Marker({
        //     color: "Red",
        //     element: markerHtml
        // })
        // .setLngLat( this.currenCenter )
        // .addTo(this.map)

        
    }

    // ngAfterViewChecked(): void {
    //     console.log("paso por el checked");
    //     this.saveToLocalStorage()
    // }

    public createMarker(){

        if( !this.map ) return;

        const color = `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').slice(-6)}`
        const lngLat = this.map.getCenter();

        this.addMarker( lngLat, color )
        
    }


    private addMarker(lngLat: LngLat, color: string = "red"){

        if( !this.map ) return;

        const marker = new Marker({
            color,
            draggable: true
        })
        .setLngLat( lngLat )
        .addTo( this.map )

        marker.on("dragend", () => { this.saveToLocalStorage() })

        this.markers.push({ 
            color, 
            marker
        })

    }


    public deleteMarker(index: number){
        this.markers[index].marker.remove()
        this.markers.splice( index, 1);
        this.saveToLocalStorage()
    }

    public flyTo( marker: Marker ){
        this.map?.flyTo({
            zoom: 14,
            center: marker.getLngLat()
        })
    }


    private saveToLocalStorage(){
        const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
            return {
                color,
                lngLat: marker.getLngLat().toArray()
            }
        })

        localStorage.setItem("plainMarkers", JSON.stringify(plainMarkers))
    }
    
    private readToLocalStorage(){
        const plainMarkersString = localStorage.getItem("plainMarkers") ?? "[]";

        const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString)

        plainMarkers.forEach( ({color , lngLat}) => {
            const [lng, lat ] = lngLat;
            const coords = new LngLat(lng, lat)

            this.addMarker(coords, color)
        });
        
    }
}
