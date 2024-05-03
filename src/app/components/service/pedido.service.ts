import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  baseUrl: String = environment.baseUrl;

 
  constructor(private http: HttpClient) {}

  findByidCliente(idCliente: any): Observable<Pedido> {
    const url = `${this.baseUrl}pedidos/clientes/${idCliente}/pedidos`;
    return this.http.get<any>(url);

  }

}
 