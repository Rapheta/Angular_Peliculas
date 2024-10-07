import { inject, Injectable } from '@angular/core';
import { GeneroCreacionDto, GeneroDto } from './generos';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';

@Injectable({
  providedIn: 'root'
})
export class GenerosService implements IServicioCRUD<GeneroDto,GeneroCreacionDto> {

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

  public crear(genero: GeneroCreacionDto): Observable<any>
  {
    return this.http.post(this.urlBase, genero);
  }

  public obtenerTodos(): Observable<GeneroDto[]> {
    return this.http.get<GeneroDto[]>(`${this.urlBase}/todos`);
  }

  public obtenerPorId(id: number): Observable<GeneroDto> {
    return this.http.get<GeneroDto>(`${this.urlBase}/${id}`);
  }

  public actualizar(id: number, genero: GeneroCreacionDto): Observable<any>{
    return this.http.put(`${this.urlBase}/${id}`, genero);
  }

  public borrar(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
