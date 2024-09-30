import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { CinesService } from '../cines.service';
import { IndiceEntidadComponent } from '../../compartidos/componentes/indice-entidad/indice-entidad.component';

@Component({
  selector: 'app-indice-cine',
  standalone: true,
  imports: [IndiceEntidadComponent], // RouterLink, MatButtonModule],
  templateUrl: './indice-cine.component.html',
  styleUrl: './indice-cine.component.css',
  providers: [
    { provide: SERVICIO_CRUD_TOKEN, useClass: CinesService }
  ]
})
export class IndiceCineComponent {

}
