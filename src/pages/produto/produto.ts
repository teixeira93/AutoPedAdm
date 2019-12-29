import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { ToastProvider } from './../../providers/toast/toast';
import { ProdutosProvider } from './../../providers/produtos/produtos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';



@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  produtos: Observable<any[]>;
  categoria:any;
  form: any;
  

  public isSearchbarOpened = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastProvider,
              private pedidosProvider:PedidosProvider,
              private produtosProvider:ProdutosProvider) {
      // this.produtos = this.produtosProvider.getAll();
      this.categoria = this.navParams.data.categoria || {};
      this.produtos = this.produtosProvider.getAllProdutos(this.navParams.data.marcakey);

  }

  onSearch(event){
    console.log(event.target.value);
  }


  editItemProdutos(marca: any) {                      // categoria.key é igual ao
    this.navCtrl.push('EditProdutosPage', { marcaKey: marca.key });
  }

  removeItemProdutos(key:string, removeImg:boolean) {
    this.produtosProvider.remove(key, removeImg);
    this.toast.show('Produto removido com sucesso.');
  }

  onSubmit(item: any){
    const produtos={
      produtoskey:item.key,
      name:item.data.name,
      categoryKey:item.data.categoryKey,
      categoryName:item.data.categoryName
    }
      this.pedidosProvider.save(produtos);
      this.toast.show('Produtos salvo em Pedido com sucesso');
      // this.toast.create({ message: 'Categoria salva com sucesso', duration: 3000}).present();
      // this.navCtrl.pop();

  }

  carPedido(){
    this.navCtrl.push('PedidoPage');
  }

}
