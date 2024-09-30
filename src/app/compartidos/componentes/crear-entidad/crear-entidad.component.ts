import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { SERVICIO_CRUD_TOKEN } from '../../proveedores/proveedores';
import { IServicioCRUD } from '../../interfaces/IServicioCRUD';
import { extraerErrores } from '../../funciones/extraerErrores';
import { Router } from '@angular/router';
import { MostrarErroresComponent } from "../mostrar-errores/mostrar-errores.component";

@Component({
  selector: 'app-crear-entidad',
  standalone: true,
  imports: [MostrarErroresComponent],
  templateUrl: './crear-entidad.component.html',
  styleUrl: './crear-entidad.component.css'
})
export class CrearEntidadComponent<TDTO,TCreacionDTO> implements AfterViewInit {

  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
    this.componentRef.instance.posteoFormulario.subscribe((entidad:any) => {
      this.guardarCambios(entidad);
    });
  }

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaIndice!: string;

  @Input({required: true})
  formulario: any;

  errores: string[] = [];

  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  private router = inject(Router);

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO,TCreacionDTO>;

  guardarCambios(entidad: TCreacionDTO){

    this.servicioCRUD.crear(entidad).subscribe({
      next:() => {
        this.router.navigate([this.rutaIndice]);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });

  }
}
