import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ActorCreacionDTO, ActorDTO } from './actores';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { Observable } from 'rxjs';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/actores';

  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<ActorDTO[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<ActorDTO[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  //Sin Paginación
  //public obtenerTodos(): Observable<ActorDTO[]>{
    //return this.http.get<ActorDTO[]>(this.urlBase);
  //}

  public crear(actor: ActorCreacionDTO)
  {
    const formData = this.construirFormData(actor);
    return this.http.post(this.urlBase, formData);
  }

  private construirFormData(actor: ActorCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('nombre', actor.nombre);
    formData.append('fechaNacimiento', actor.fechaNacimiento.toISOString().split('T')[0]);
    
    if(actor.foto){
      formData.append('foto', actor.foto);
    }

    return formData;
  }

  public obtenerPorId(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, actor: ActorCreacionDTO){
    console.log('entra');
    const formData = this.construirFormData(actor);
    console.log(formData);
    return this.http.put(`${this.urlBase}/${id}`, formData);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
