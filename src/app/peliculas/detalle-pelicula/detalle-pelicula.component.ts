import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../peliculas';
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Coordenada } from '../../compartidos/componentes/mapa/coordenada';
import { MapaComponent } from "../../compartidos/componentes/mapa/mapa.component";

@Component({
  selector: 'app-detalle-pelicula',
  standalone: true,
  imports: [CargandoComponent, MatChipsModule, RouterLink, MapaComponent],
  templateUrl: './detalle-pelicula.component.html',
  styleUrl: './detalle-pelicula.component.css'
})
export class DetallePeliculaComponent implements OnInit {

  ngOnInit(): void {
    this.peliculasService.obtenerPorId(this.id).subscribe(pelicula => {
      pelicula.fechaLanzamiento = new Date(pelicula.fechaLanzamiento);
      this.pelicula = pelicula;
      this.trailerURL = this.generarURLYoutube(pelicula.trailer);

      this.coordenadas = pelicula.cines!.map( cine => {
        return <Coordenada>{ latitud: cine.latitud, longitud: cine.longitud, texto: cine.nombre };
      });
    })
  }

  @Input({transform: numberAttribute})
  id!: number;

  pelicula!: PeliculaDTO;

  peliculasService = inject(PeliculasService);

  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;

  coordenadas: Coordenada[] = [];

  generarURLYoutube(url: string): SafeResourceUrl | string {
    if(!url)
    {
      return '';
    }

    var videoId = url.split('v=')[1];
    var posicionAmpersand = videoId.indexOf('&');
    if(posicionAmpersand !== -1) {
      videoId = videoId.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`)
  }

}
