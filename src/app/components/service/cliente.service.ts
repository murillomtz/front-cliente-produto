import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: String = environment.baseUrl;

 
  constructor(private http: HttpClient) {}

  findByid(id: any): Observable<Cliente> {
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.get<any>(url);

  }

  fingAllGaleria(page: number): Observable<Cliente[]> {
    const url = `${this.baseUrl}usuarios?pagina=${page}&size=6`;
    return this.http.get<any>(url);
  }

  fingAll(page: number): Observable<Cliente[]> {
    const url = `${this.baseUrl}usuarios?pagina=${page}`;
    return this.http.get<any>(url);
  }

  create(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}usuarios`
    return this.http.post<Cliente>(url, cliente)
  }

  update(cliente: Cliente): Observable<Cliente> {
    const url = `${this.baseUrl}/usuarios/${cliente.id}`
    return this.http.put<Cliente>(url, cliente)
  }
  
  delete(id: any): Observable<void> {
    const url = `${this.baseUrl}/usuarios/${id}`
    return this.http.delete<void>(url)
  }
}