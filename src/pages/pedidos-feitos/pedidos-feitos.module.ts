import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosFeitosPage } from './pedidos-feitos';

@NgModule({
  declarations: [
    PedidosFeitosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosFeitosPage),
  ],
})
export class PedidosFeitosPageModule {}
