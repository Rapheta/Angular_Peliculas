import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CredencialesUsuarioDTO, RespuestaAutenticacionDTO } from './seguridad';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  private http = inject(HttpClient);
  private urlBase = environment.apiURL + '/usuarios';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  registrar(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/registrar`, credenciales)
                .pipe(
                  tap( respAutenticacion => this.guardarToken(respAutenticacion) )
                );
  }

  login(credenciales: CredencialesUsuarioDTO): Observable<RespuestaAutenticacionDTO> {
    return this.http.post<RespuestaAutenticacionDTO>(`${this.urlBase}/login`, credenciales)
                .pipe(
                  tap( respAutenticacion => this.guardarToken(respAutenticacion) )
                );
  }

  guardarToken(respuestaAutenticacionDTO: RespuestaAutenticacionDTO)
  {
    localStorage.setItem(this.llaveToken, respuestaAutenticacionDTO.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacionDTO.expiracion.toString());
  }

  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    if(!expiracion)
    {
      return false;
    }
    else{
      const expiracionFecha = new Date(expiracion);
      if(expiracionFecha < new Date())
      {
        this.logout();
        return false;
      }

      return true;
    }
    
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string {
    return '';  //admin
  }
}
