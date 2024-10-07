import { Component, inject, OnInit } from '@angular/core';
import { ListadoPeliculasComponent } from '../peliculas/listado-peliculas/listado-peliculas.component';
import { RatingComponent } from '../compartidos/componentes/rating/rating.component';
import { PeliculasService } from '../peliculas/peliculas.service';
import { subscribeOn } from 'rxjs';
import { AutorizadoComponent } from "../seguridad/autorizado/autorizado.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ListadoPeliculasComponent, RatingComponent, AutorizadoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent { //implements OnInit {
  
  peliculasEnCines!: any[];
  peliculasProximosEstrenos!: any[];

  peliculasService = inject(PeliculasService);

  constructor() {
    this.cargarPeliculas();
  }

  cargarPeliculas(){
    this.peliculasService.ObtenerLandingPage().subscribe(modelo => {
      this.peliculasEnCines = modelo.enCines;
      this.peliculasProximosEstrenos = modelo.proximosEstrenos;
    });
  }

  peliculaBorrada() {
    this.cargarPeliculas();
  }

  /* ngOnInit(): void {



    setTimeout(() => {
      
      this.peliculasEnCines = [{
        titulo: 'Inside Out 2',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832'
      },
      {
        titulo: 'Moana 2',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg'
      },
      {
        titulo: 'Bad Boys: Ride or Die',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg'
      }];

      this.peliculasProximosEstrenos = [
      {
        titulo: 'Deadpool & Wolverine',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg'
      },
      {
        titulo: 'Oppenheimer',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg'
      },
      {
        titulo: 'The Flash',
        fechaLanzamiento: new Date('2016-05-03'),
        precio: 300.99,
        poster: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg'
      }];

    }, 100); 
  }
    */

  procesarVoto(voto:number) {
    alert(`Calificación otorgada: ${voto}`);
  }

}
