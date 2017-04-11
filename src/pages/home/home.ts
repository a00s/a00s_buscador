import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  produtos: any;
  buscar: string = "";
  quantidade: any;
  constructor(public navCtrl: NavController, public http: Http) {
    this.buscaQuantidade();
  }
  buscaApi() {
    if (this.buscar != "") {
      this.http.get('https://www.a00s.com.br/a00s_V2-20170318/a00s_api?tipo=a00s_busca&busca=' + this.buscar).map(res => res.json()).subscribe(
        data => {
          console.log("Retornando data");
          this.produtos = data;
          if (this.produtos.length == 0) {
            console.log(this.produtos.length);
            this.produtos = [{
              "descricao": "Produto não encontrado"
            }]
          }
        },
        err => {
          console.log("Nao foi possivel buscar!" + err);
        });
    }
  }

  buscaQuantidade() {
      this.http.get('https://www.a00s.com.br/a00s_V2-20170318/a00s_api?tipo=a00s_busca_total' + this.buscar).map(res => res.json()).subscribe(
        data => {
          console.log("Retornando data:"+data[0].quantidade);
          this.quantidade = data[0].quantidade;
        },
        err => {
          console.log("Nao foi possivel buscar!" + err);
        });
  }

  limpar() {
    this.buscar = "";
  }
}
