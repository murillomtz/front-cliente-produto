import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/components/model/produto.model';
import { ProdutoService } from 'src/app/components/service/produto.service';

@Component({
  selector: 'app-update-produto',
  templateUrl: './update-produto.component.html',
  styleUrls: ['./update-produto.component.css']
})
export class UpdateProdutoComponent implements OnInit {

  id_produto: any = '';
  produto: Produto = {
    descricao: '',
    id: '',
    nome: '',
    quantidade: '0',
    valorVenda: '',
  };

  constructor(private service: ProdutoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('componenteAtual', "Atualizar Produto");
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

  atualizar(): void {
    this.service.update(this.produto).subscribe(resposta => {
      this.router.navigate(['produtos']);
      alert("Produto alterado.");

    }, err => {

      alert('Erro ao criar novo livro. Tente mais tarde!')
    });
  }


}
