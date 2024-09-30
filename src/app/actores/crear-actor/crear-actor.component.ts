import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { Router, RouterLink } from '@angular/router';
import { ActorCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from '../../compartidos/componentes/crear-entidad/crear-entidad.component';

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [FormularioActoresComponent, CrearEntidadComponent], //RouterLink, MostrarErroresComponent
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: ActoresService }
  ]
})
export class CrearActorComponent {

  formularioActores = FormularioActoresComponent;

  /* private router = inject(Router);
  private actoresService = inject(ActoresService);
  errores: string[] = [];

  guardarCambios(actor: ActorCreacionDTO) {
    this.actoresService.crear(actor).subscribe({
      next:() => {
        this.router.navigate(['/actores']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });
  } */

}
