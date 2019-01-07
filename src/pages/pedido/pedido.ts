import { FormBuilder, FormGroup } from '@angular/forms';
import { PedidosProvider } from './../../providers/pedidos/pedidos';
import { Observable } from 'rxjs/observable';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FinalizadoProvider } from './../../providers/finalizado/finalizado';




@IonicPage()

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  pedidos:Observable<any[]>;
  form: FormGroup;


  constructor(public navCtrl: NavController,
              private pedidosProvider:PedidosProvider,

              public alertCtrl: AlertController,


              public navParams: NavParams) {
                this.pedidos = this.pedidosProvider.getAll();
  }


  finishPedido(){
    this.navCtrl.push('PedidosFeitosPage');
  }



  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Finalizar',
      message: 'Deseja finalizar o seu pedido?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Pedido não finalizado.');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Pedido finalizado com sucesso.');
          }
        }
      ]
    });
    confirm.present();

  }

}



