import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url = `${environment.base_url}usuario`;
  constructor(private http: HttpClient) { }

  findByIntentos(intentos: number){
    const ruta = `${this.url}/${intentos}`;
    return this.http.get(ruta);
  }

}
