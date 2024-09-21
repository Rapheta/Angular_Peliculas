import { Component, inject } from '@angular/core';
import { FormularioActoresComponent } from '../formulario-actores/formulario-actores.component';
import { Router, RouterLink } from '@angular/router';
import { ActorCreacionDTO } from '../actores';
import { ActoresService } from '../actores.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-actor',
  standalone: true,
  imports: [RouterLink, FormularioActoresComponent, MostrarErroresComponent],
  templateUrl: './crear-actor.component.html',
  styleUrl: './crear-actor.component.css'
})
export class CrearActorComponent {

  private router = inject(Router);
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
  }

}
