import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, LatLng, latLng, LeafletMouseEvent, marker, Marker, MarkerOptions, tileLayer } from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import "leaflet/dist/leaflet.css";
import { Coordenada } from './coordenada';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements OnInit {

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map( valor => {
      const marcador = marker([valor.latitud, valor.longitud], this.markerOptions);
      this.options.center = new LatLng(valor.latitud, valor.longitud);

      if(valor.texto){
        marcador.bindPopup(valor.texto, { autoClose: false, autoPan: false });
      }

      return marcador;
    });
  }

  @Input()
  soloLectura = false;

  @Input()
  coordenadasIniciales: Coordenada[] = [];

  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>();

  markerOptions: MarkerOptions = {
    icon: icon({
      iconSize: [25,41],
      iconAnchor: [13,41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(39.575799, 2.712242)
  };

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent){
    if(this.soloLectura)
    {
      return;
    }

    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    this.capas = [];
    this.capas.push(marker([latitud, longitud], this.markerOptions));
    this.coordenadaSeleccionada.emit({latitud, longitud});
  }

}
