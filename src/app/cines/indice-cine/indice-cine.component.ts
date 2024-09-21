import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-indice-cine',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './indice-cine.component.html',
  styleUrl: './indice-cine.component.css'
})
export class IndiceCineComponent {

}
