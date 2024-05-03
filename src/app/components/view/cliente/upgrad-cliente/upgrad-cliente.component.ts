import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/components/model/cliente.model';
import { ClienteService } from 'src/app/components/service/cliente.service';
import { LocalidadeService } from 'src/app/components/service/localidade.service';

@Component({
  selector: 'app-upgrad-cliente',
  templateUrl: './upgrad-cliente.component.html',
  styleUrls: ['./upgrad-cliente.component.css'],
})
export class UpgradClienteComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    nome: '',
    email: '',
    cpf: '',
  };

  estados: { id: number; sigla: string }[] = [];
  cidades: any[] = [];
  paises: any[] = [];
  endereco: any = {};
  id_cliente: any;

  constructor(
    private service: ClienteService,
    private router: Router,
    private route: ActivatedRoute,
    private localidadesService: LocalidadeService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem('componenteAtual', 'Alterar Cliente');

    this.id_cliente = this.route.snapshot.paramMap.get('id');
    this.service.findByid(this.id_cliente).subscribe((data: any) => {
      this.cliente.id = data.data.id;
      this.cliente.nome = data.data.nome;
      this.cliente.email = data.data.email;
      this.cliente.cpf = data.data.cpf;
    });

    this.localidadesService.getEstados().subscribe((estados: any[]) => {
      this.estados = estados.map((estado) => ({
        id: estado.id,
        sigla: estado.sigla,
      }));
    });

    this.localidadesService.getPaises().subscribe((paises: any) => {
      this.paises = paises.map((pais: any) => {
        return pais.translations.por.common; 
      });
    });

    // var estadoMap = this.estados.find(estado => estado.sigla == this.cliente.estado);
    // this.localidadesService
    // .getCidadesPorEstado(estadoMap?.id)
    // .subscribe((cidades) => {
    //   this.cidades = cidades;
    //   console.log(this.cliente.estado,'##########cidades########## 1,' + this.cidades);
    // });
  }

  create(): void {

    console.log(this.cliente);
    this.service.create(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(['clientes/tabela']);
      },
      (err) => {
        // this.service.mensagem('Erro ao criar novo cliente. Tente mais tarde!')
        console.log(err);
      }
    );
  }

  onChangeEstado(estado: any) {
    console.log('event', estado.value.slice(3, estado.length));
    this.localidadesService
      .getCidadesPorEstado(estado.value.slice(3, estado.length).trim())
      .subscribe((cidades) => {
        this.cidades = cidades;
      });
  }
}
