import { MarcasProvider } from './../../providers/marcas/marcas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/observable';


@IonicPage()
@Component({
  selector: 'page-marcas',
  templateUrl: 'marcas.html',
})
export class MarcasPage {

  marcas: Observable<any[]>;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private marcasProvider: MarcasProvider) {

      this.marcas = this.marcasProvider.getAll();

  }

  newMarcas(){
    this.navCtrl.push('EditMarcasPage');
  }

  newItemProdutos() {
    this.navCtrl.push('EditProdutosPage');
  }

  editMarcas(marca: any){
    this.navCtrl.push('EditMarcasPage', { marcakey: marca.key});
  }

  removeMarcas(key:string){
    this.marcasProvider.remove(key);
    this.toast.create({message:'Produto removido com sucesso!', duration: 3000}).present();
  }

  listProdutos(marca: any){
    this.navCtrl.push('ProdutoPage', {marcakey: marca.key})
  }

}
