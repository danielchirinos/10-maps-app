import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{
    
    @ViewChild("map") divMap?: ElementRef;

    public zoom: number = 10;
    public map?: Map;
    public currenCenter: LngLat = new LngLat(-70.7057444, -33.4558354);
    // public lat: 

    // se hace aqui para tener todo despues que la vista este inicializada
    ngAfterViewInit(): void {

        if(!this.divMap) throw "No se encontro el div del mapa"
        
        this.map = new Map({
            container: this.divMap.nativeElement, // container ID
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            center: this.currenCenter, // starting position [lng, lat]
            zoom: this.zoom, // starting zoom
        });

        this.mapListener();
    }

    mapListener(){
        if(!this.map ) throw "Mapa no inicializado";

        //escucha el zoom del mapa y se lo asigna a la variable zoom
        this.map.on("zoom", (ev) => {
            this.zoom = this.map!.getZoom();
            
        })

        // escucha cuando el zoom termina y verifica si es mayor a 18 lo setea en 18
        this.map.on("zoomend", (ev) => {
            if(this.map!.getZoom() < 18) return;

            this.map!.zoomTo(18)
        })

        this.map.on("move", (ev) => {
            this.currenCenter = this.map!.getCenter();
            console.log(this.currenCenter );

            // para extraer las propiedades, desectructuramos el objeto

            const { lng, lat } = this.currenCenter;
            console.log(lng, lat);
            
            
            
        })
    }

    //funcion para el boton zoomIn  (+) del mapa
    zoomIn(){
        this.map?.zoomIn();
    }

    //funcion para el boton zoomIOut (-) del mapa
    zoomOut(){
        this.map?.zoomOut();
    }

    //funcion para cambiar el valor de zoom desde el input range del mapa
    zoomChanged(value: string){
        this.zoom = Number(value)
        this.map?.zoomTo( this.zoom )
    }


    ngOnDestroy(): void {
        this.map?.remove()
    }

}
