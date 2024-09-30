import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDto } from '../generos';
import { GenerosService } from '../generos.service';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from "../../compartidos/componentes/crear-entidad/crear-entidad.component";

@Component({
  selector: 'app-crear-generos',
  standalone: true,
  imports: [FormularioGeneroComponent, CrearEntidadComponent], //MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MostrarErroresComponent, CrearEntidadComponent
  templateUrl: './crear-generos.component.html',
  styleUrl: './crear-generos.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: GenerosService }
  ]
})
export class CrearGenerosComponent {

  formularioGeneros = FormularioGeneroComponent;

  //private router = inject(Router);
  //private generosService = inject(GenerosService);
  //errores: string[] = [];

  /* guardarCambios(genero: GeneroCreacionDto){

    this.generosService.crear(genero).subscribe({
      next:() => {
        this.router.navigate(['/generos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });

  } */

}
