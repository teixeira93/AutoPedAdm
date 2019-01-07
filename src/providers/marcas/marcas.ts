import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';


@Injectable()
export class MarcasProvider {
  private PATH = 'marcas/';
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

  save(marcaData: any){
    const marca = {
      nome:marcaData.nome,

    };
    if(marcaData.key){
      this.db.list(this.PATH).update(marcaData.key, marca);
    }else{
      this.db.list(this.PATH).push(marca);
    }

  }

  remove(key:string){
     this.db.list(this.PATH).remove(key);

  }

}
