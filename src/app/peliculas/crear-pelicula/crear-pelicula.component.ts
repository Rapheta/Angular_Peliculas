import { Component, inject } from '@angular/core';
import { PeliculaCreacionDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../peliculas.service';
import { SelectorMultipleComponent } from '../../compartidos/componentes/selector-multiple/selector-multiple.component';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";

@Component({
  selector: 'app-crear-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent, MostrarErroresComponent, CargandoComponent],
  templateUrl: './crear-pelicula.component.html',
  styleUrl: './crear-pelicula.component.css'
})
export class CrearPeliculaComponent {

  generosSeleccionados: SelectorMultipleDTO[] = [];

  generosNoSeleccionados: SelectorMultipleDTO[] = [];
/*   [
    { llave: 1, valor: "Drama" },
    { llave: 2, valor: "Acción" },
    { llave: 3, valor: "Comedia" }
  ]; */

  cinesSeleccionados: SelectorMultipleDTO[] = [];

  cinesNoSeleccionados: SelectorMultipleDTO[] = [];
  /* [
    { llave: 1, valor: "Agora Mall" },
    { llave: 2, valor: "Blue Mall" },
    { llave: 3, valor: "Acropolis" }
  ]; */

  actoresSeleccionados: actorAutocompleteDTO[] = [];

  peliculasService = inject(PeliculasService);

  router = inject(Router);

  errores: string[] = [];

  constructor() {
    this.peliculasService.crearGet().subscribe(modelo => {
      this.generosNoSeleccionados = modelo.generos.map(genero => {
        return <SelectorMultipleDTO>{ llave: genero.id, valor: genero.nombre };
      });

      this.cinesNoSeleccionados = modelo.cines.map(cine => {
        return <SelectorMultipleDTO>{ llave: cine.id, valor: cine.nombre };
      });
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.crear(pelicula).subscribe({
      next: pelicula => {
        console.log(pelicula);
        this.router.navigate(['/']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }
}
