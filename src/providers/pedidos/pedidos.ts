import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()
export class PedidosProvider {
  private PATH = 'pedidos/';

  constructor(private db:AngularFireDatabase) {}

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes => {
      return changes.map( c =>({ key: c.key, ...c.payload.val() }));
    })
  }

  get(categorykey:string){
    return this.db.object(this.PATH + categorykey)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    })
  }

  save(pedidosData: any){
    // const pedido = {
    //   nome:pedidoData.nome
    // };
    if(pedidosData.key){
      this.db.list(this.PATH).update(pedidosData.key, pedidosData);
    }else{
      this.db.list(this.PATH).push(pedidosData);
    }
  }

}
