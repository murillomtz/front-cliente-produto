import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/components/model/produto.model';
import { ProdutoService } from 'src/app/components/service/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent implements OnInit {

  produto: Produto = {
    descricao: '',
    id: '',
    nome: '',
    quantidade: '0',
    valorVenda: '',
  };

  constructor(private service: ProdutoService,
    private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('componenteAtual', "Novo Produto");
  }

  create(): void {
    this.service.create(this.produto).subscribe(resposta => {
      this.router.navigate(['produtos'])
      
    }, err => {
      
      // this.service.mensagem('Erro ao criar novo cliente. Tente mais tarde!')
    });
  }
  

}
