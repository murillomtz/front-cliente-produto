import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/components/model/produto.model';
import { ProdutoService } from 'src/app/components/service/produto.service';

@Component({
  selector: 'app-produto-detalhes',
  templateUrl: './produto-detalhes.component.html',
  styleUrls: ['./produto-detalhes.component.css'],
})
export class ProdutoDetalhesComponent implements OnInit {
  produto: Produto = {
    descricao: '',
    id: '',
    nome: '',
    quantidade: '',
    valorVenda: '',
  };

  id_produto: any = '';

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    sessionStorage.setItem('componenteAtual', 'Produto Detalhes');
    this.id_produto = this.route.snapshot.paramMap.get('id');

    this.service.findByid(this.id_produto).subscribe((data: any) => {
      this.produto.id = data.data.id;
      this.produto.nome = data.data.nome;
      this.produto.quantidade = data.data.quantidade;
      this.produto.valorVenda = data.data.valorVenda;
      this.produto.descricao = data.data.descricao;

      console.log('#################### 0,' + data.data.nome);
      console.log('#################### 1,' + JSON.stringify(this.produto));
    });
  }

  nagevarParaAtualizarProduto(): void {
    this.router.navigate([`produtos/alteracao/${this.produto.id}`]);
  }

  remover(): void {

    this.service.delete(this.produto.id).subscribe(
      (data : any) => { this.router.navigate(['produtos']);
      console.log(data.data)
    },err => {
      console.log(err)
      // this.service.mensagem('Erro ao criar novo cliente. Tente mais tarde!')
    });
  }
}
