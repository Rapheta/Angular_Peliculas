import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDto, GeneroDto } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/generos';

  constructor() { }

  public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<GeneroDto[]>>{
    let queryParams = construirQueryParams(paginacion);
    return this.http.get<GeneroDto[]>(this.urlBase, { params: queryParams, observe: 'response' });
  }

  //Sin Paginación
  //public obtenerTodos(): Observable<GeneroDto[]>{
    //return this.http.get<GeneroDto[]>(this.urlBase);
  //}

  public crear(genero: GeneroCreacionDto)
  {
    return this.http.post(this.urlBase, genero);
  }

  public obtenerPorId(id: number): Observable<GeneroDto> {
    return this.http.get<GeneroDto>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, genero: GeneroCreacionDto){
    return this.http.put(`${this.urlBase}/${id}`, genero);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
