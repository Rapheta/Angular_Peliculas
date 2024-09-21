import { Component, Input } from '@angular/core';
import { SelectorMultipleDTO } from './SelectorMultipleModelo';

@Component({
  selector: 'app-selector-multiple',
  standalone: true,
  imports: [],
  templateUrl: './selector-multiple.component.html',
  styleUrl: './selector-multiple.component.css'
})
export class SelectorMultipleComponent {

    @Input({required: true})
    seleccionados!: SelectorMultipleDTO[];

    @Input({required: true})
    noSeleccionados!: SelectorMultipleDTO[];

    seleccionar(elemento: SelectorMultipleDTO, indice: number) {
      this.seleccionados.push(elemento);
      this.noSeleccionados.splice(indice, 1);
    }

    desseleccionar(elemento: SelectorMultipleDTO, indice: number){
      this.noSeleccionados.push(elemento);
      this.seleccionados.splice(indice, 1);
    }

    seleccionarTodo(){
      this.seleccionados.push(...this.noSeleccionados);
      this.noSeleccionados.length = 0;  // limpia el array
    }

    desseleccionarTodo(){
      this.noSeleccionados.push(...this.seleccionados);
      this.seleccionados.length = 0;  // limpia el array
    }
}
