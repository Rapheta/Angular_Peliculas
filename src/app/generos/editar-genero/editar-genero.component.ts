import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { FormularioGeneroComponent } from "../formulario-genero/formulario-genero.component";
import { GeneroCreacionDto, GeneroDto } from '../generos';
import { GenerosService } from '../generos.service';
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';
import { MostrarErroresComponent } from "../../compartidos/componentes/mostrar-errores/mostrar-errores.component";
import { Router } from '@angular/router';
import { extraerErrores } from '../../compartidos/funciones/extraerErrores';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [FormularioGeneroComponent, CargandoComponent, MostrarErroresComponent],
  templateUrl: './editar-genero.component.html',
  styleUrl: './editar-genero.component.css'
})
export class EditarGeneroComponent implements OnInit {

  ngOnInit(): void {
    this.generosService.obtenerPorId(this.id).subscribe(genero => {
      this.genero = genero;
    });
  }

  @Input({ transform: numberAttribute })
  id!: number;

  genero?: GeneroDto;
  generosService = inject(GenerosService);

  errores: string[] = [];
  router = inject(Router);

  guardarCambios(genero: GeneroCreacionDto){
    this.generosService.actualizar(this.id, genero).subscribe({
      next: () => {
        this.router.navigate(['/generos']);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    })
  }

}
