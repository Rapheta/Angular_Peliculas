import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ActoresService } from '../actores.service';
import { ActorDTO } from '../actores';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListadoGenericoComponent } from "../../compartidos/componentes/listado-generico/listado-generico.component";
import { MatTableModule } from '@angular/material/table';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
  selector: 'app-indice-actores',
  standalone: true,
  imports: [IndiceEntidadComponent], //RouterLink, MatButtonModule, ListadoGenericoComponent, MatTableModule, MatPaginatorModule, SweetAlert2Module, 
  templateUrl: './indice-actores.component.html',
  styleUrl: './indice-actores.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService }
  ]
})
export class IndiceActoresComponent {

  /* actoresService = inject(ActoresService);
  actores!: ActorDTO[];
  columnasAMostrar: string[] = ['id','nombre','acciones'];
  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 5};
  cantidadTotalRegistros!: number;

  constructor() {
    this.cargarRegistros();
  }

  cargarRegistros() {
    //Sin Paginacion
    //const actores = this.actoresService.obtenerTodos().subscribe(actores => {
    //  this.actores = actores;
    //});

    const actores = this.actoresService.obtenerPaginado(this.paginacion).subscribe(( respuesta: HttpResponse<ActorDTO[]> ) => {
      this.actores = respuesta.body as ActorDTO[];
      const cabecera = respuesta.headers.get("cantidad-total-registros") as string;
      this.cantidadTotalRegistros = parseInt(cabecera, 10);
    });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = { pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize };
    this.cargarRegistros();
  }

  borrar(id: number) {
    this.actoresService.borrar(id).subscribe(() => {
      this.paginacion.pagina = 1;
      this.cargarRegistros();
    })
  } */

}
