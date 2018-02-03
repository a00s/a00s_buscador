import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { enableProdMode } from '@angular/core';
enableProdMode();
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  produtos: any;
  buscar: string = "";
  quantidade: any;
  urlAPI: string;
  id_empresa: string;
  constructor(public navCtrl: NavController, public http: Http) {
    //console.log("Cheguei aqui: "+window.location.href);
    let id_empresal = window.location.href.split("?");
    this.id_empresa = id_empresal[1];
    this.procuraURLapi();
  }

  procuraURLapi() {
    this.http.get('http://w.a00s.com/ultima_versao_api').map(res => res.text()).subscribe(
      data => {
        this.urlAPI = data;
        this.urlAPI = "https://www.a00s.com.br/a00s_V2-20170318";

        if (this.id_empresa == null) {
          this.buscaQuantidade();
        } else {
          this.buscaApiEmpresa();
        }
      },
      err => {
        console.log("Nao foi possivel buscar!" + err);
      }
    );
  }

  buscaApiEmpresa() {
    this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_empresa&busca=' + this.buscar + "&empresa=" + this.id_empresa).map(res => res.json()).subscribe(
      data => {
        this.produtos = data;
        if (this.produtos.length == 0) {
          this.produtos = [{
            "descricao": "Produto não encontrado"
          }]
        }
      },
      err => {
        console.log("Nao foi possivel buscar!" + err);
      });
  }

  buscaApi() {
    if (this.buscar != "") {
      if (this.id_empresa == null) {
        this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca&busca=' + this.buscar).map(res => res.json()).subscribe(
          data => {
            this.produtos = data;
            if (this.produtos.length == 0) {
              this.produtos = [{
                "descricao": "Produto não encontrado"
              }]
            }
          },
          err => {
            console.log("Nao foi possivel buscar!" + err);
          });
      } else {
        this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_empresa&busca=' + this.buscar + "&empresa=" + this.id_empresa).map(res => res.json()).subscribe(
          data => {
            this.produtos = data;
            if (this.produtos.length == 0) {
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
  }

  buscaQuantidade() {
    this.http.get(this.urlAPI + '/a00s_api?tipo=a00s_busca_total' + this.buscar).map(res => res.json()).subscribe(
      data => {
        console.log("Retornando data:" + data[0].quantidade);
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
