import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { ActorCreacionDTO, ActorDTO } from '../actores';
import { FormularioActoresComponent } from "../formulario-actores/formulario-actores.component";
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { ActoresService } from '../actores.service';
import { Router } from '@angular/router';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { CargandoComponent } from "../../compartidos/componentes/cargando/cargando.component";
import { EditarEntidadComponent } from "../../compartidos/componentes/editar-entidad/editar-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
  selector: 'app-editar-actor',
  standalone: true,
  imports: [FormularioActoresComponent, EditarEntidadComponent],  //MostrarErroresComponent, CargandoComponent, 
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService }
  ]
})
export class EditarActorComponent { //implements OnInit {

  @Input({ transform: numberAttribute })
  id!: number;

  formularioActores = FormularioActoresComponent;

  /* ngOnInit(): void {
    this.actoresService.obtenerPorId(this.id).subscribe(actor => {
      this.actor = actor;
    });
  }

  actor?: ActorDTO;
  actoresService = inject(ActoresService);

  errores: string[] = [];
  router = inject(Router);

  guardarCambios( actor: ActorCreacionDTO ){
    this.actoresService.actualizar(this.id, actor).subscribe({
      next: () => {
        this.router.navigate(['/actores']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  } */

}
