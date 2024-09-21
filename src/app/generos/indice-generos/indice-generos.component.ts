import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GenerosService } from '../generos.service';
import { GeneroDto } from '../generos';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-indice-generos',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module],
  templateUrl: './indice-generos.component.html',
  styleUrl: './indice-generos.component.css'
})
export class IndiceGenerosComponent {

  generosService = inject(GenerosService);
  generos!: GeneroDto[];
  columnasAMostrar: string[] = ['id','nombre','acciones'];
  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 5};
  cantidadTotalRegistros!: number;

  /**
   *
   */
  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    //Sin Paginacion
    //const generos = this.generosService.obtenerTodos().subscribe(generos => {
    //  this.generos = generos;
    //});

    const generos = this.generosService.obtenerPaginado(this.paginacion).subscribe(( respuesta: HttpResponse<GeneroDto[]> ) => {
      this.generos = respuesta.body as GeneroDto[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  actualizarPaginacion(datos: PageEvent){
    console.log(datos);
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarRegistros();
  }

  borrar(id:number){
    this.generosService.borrar(id).subscribe(() => {
      this.paginacion.pagina = 1;
      this.cargarRegistros();
    });
  }
}
