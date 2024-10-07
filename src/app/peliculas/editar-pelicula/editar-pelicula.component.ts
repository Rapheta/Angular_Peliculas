import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../peliculas';
import { FormularioPeliculasComponent } from "../formulario-peliculas/formulario-peliculas.component";
import { SelectorMultipleDTO } from '../../compartidos/componentes/selector-multiple/SelectorMultipleModelo';
import { actorAutocompleteDTO } from '../../actores/actores';
import { PeliculasService } from '../peliculas.service';
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [FormularioPeliculasComponent, MostrarErroresComponent, CargandoComponent],
  templateUrl: './editar-pelicula.component.html',
  styleUrl: './editar-pelicula.component.css'
})
export class EditarPeliculaComponent implements OnInit{

  ngOnInit(): void {
    this.peliculasService.actualizarGet(this.id).subscribe( modelo => {
      this.pelicula = modelo.pelicula;
      this.actoresSeleccionados = modelo.actores;
      this.cinesNoSeleccionados = modelo.cinesNoSeleccionados.map(cine => {
        return <SelectorMultipleDTO>{ llave: cine.id, valor: cine.nombre }
      });
      this.cinesSeleccionados = modelo.cinesSeleccionados.map(cine => {
        return <SelectorMultipleDTO>{ llave: cine.id, valor: cine.nombre }
      });
      this.generosNoSeleccionados = modelo.generosNoSeleccionados.map(genero => {
        return <SelectorMultipleDTO>{ llave: genero.id, valor: genero.nombre }
      });
      this.generosSeleccionados = modelo.generosSeleccionados.map(genero => {
        return <SelectorMultipleDTO>{ llave: genero.id, valor: genero.nombre }
      });
    })
  }
  
  @Input({ transform: numberAttribute })
  id!: number;

  pelicula!: PeliculaDTO;
  generosSeleccionados!: SelectorMultipleDTO[];
  generosNoSeleccionados!: SelectorMultipleDTO[];
  cinesSeleccionados!: SelectorMultipleDTO[];
  cinesNoSeleccionados!: SelectorMultipleDTO[];
  actoresSeleccionados!: actorAutocompleteDTO[];

  peliculasService = inject(PeliculasService);

  errores: string[] = [];
  router = inject(Router);

  /* 
  pelicula: PeliculaDTO = { id: 1, titulo: 'Moana 2', trailer: 'ABC', fechaLanzamiento: new Date('2018-07-25'), poster: 'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg' }

  generosSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: "Acción" }
  ];

  generosNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: "Drama" },
    { llave: 3, valor: "Comedia" }
  ];

  cinesSeleccionados: SelectorMultipleDTO[] = [
    { llave: 2, valor: "Blue Mall" }
  ];

  cinesNoSeleccionados: SelectorMultipleDTO[] = [
    { llave: 1, valor: "Agora Mall" },
    { llave: 3, valor: "Acropolis" }
  ];

  actoresSeleccionados: actorAutocompleteDTO[] = [
    { id: 2, nombre: 'Tom Hanks', personaje: 'Forrest Gump', foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Tom_Hanks_at_the_Elvis_Premiere_2022.jpg/220px-Tom_Hanks_at_the_Elvis_Premiere_2022.jpg' }
  ]; */

  guardarCambios(pelicula: PeliculaCreacionDTO){
    //console.log('Editando película',pelicula);
    this.peliculasService.actualizar(this.id, pelicula).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }

}
