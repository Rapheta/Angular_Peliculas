import { Component } from '@angular/core';
import { FormularioCinesComponent } from "../formulario-cines/formulario-cines.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CrearEntidadComponent } from '../../compartidos/componentes/crear-entidad/crear-entidad.component';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  standalone: true,
  imports: [FormularioCinesComponent, CrearEntidadComponent],
  templateUrl: './crear-cine.component.html',
  styleUrl: './crear-cine.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: CinesService }
  ]
})
export class CrearCineComponent {

  formularioCines = FormularioCinesComponent;

  /* guardarCambios(cine: CineCreacionDTO)
  {
    console.log('Creando cine', cine)
  } */
}
