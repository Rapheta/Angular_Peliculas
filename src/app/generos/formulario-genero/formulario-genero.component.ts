import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { GeneroCreacionDto, GeneroDto } from '../generos';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent implements OnInit {

  ngOnInit(): void {
    if(this.modelo !== undefined)
    {
      this.form.patchValue(this.modelo);
    }
  }
  
  @Input()
  modelo?: GeneroDto;

  @Output()
  posteoFormulario = new EventEmitter<GeneroCreacionDto>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre: ['', { validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(50)]}]
  })

  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if(nombre.hasError('required')) {
      return 'El campo nombre es requerido';
    }

    if(nombre.hasError('maxlength')) {
      return `El campo Nombre no puede tener más de ${ nombre.getError('maxLength').requiredLength } caracteres.`;
    }

    if(nombre.hasError('primeraLetraMayuscula')) {
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }

    return "";
  }

  guardarCambios() {
    console.log(this.form.value);

    if(!this.form.valid)
    {
      return;
    }

    const genero  = this.form.value as GeneroCreacionDto;
    this.posteoFormulario.emit(genero)
  }
  
}
