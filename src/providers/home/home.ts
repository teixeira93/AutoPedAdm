import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class HomeProvider {
  private PATH = 'home/';
  private PATH_IMG = 'img/'

  constructor(private db:AngularFireDatabase, private fb: FirebaseApp) {}

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes =>{
      return changes.map( h =>({key: h.key, ...h.payload.val()}));
    })
  }
  get(homekey:string){
    return this.db.object(this.PATH + homekey)
    .snapshotChanges()
    .map( h =>{
      return { key: h.key, ...h.payload.val()};
    })
  }
  save(homeData: any, file: File){
    const home = {
      titulo:homeData.titulohome,
      descricao:homeData.descricaohome,
      imgUrl: homeData.imgUrl

    };

    if(homeData.key){
      // this.db.list(this.PATH).update(homeData.key, home);
      this.db.object(this.PATH + homeData.key).update(home).then(() => {

        if (file) {
          this.uploadImg(homeData.key, file);
        }
    // }else{
    //   this.db.list(this.PATH).push(home);
    // }
      });
    } else {                                // a partir do then tenho na variavel result o resultado da inclusão e pego a key que foi incluída...
      this.db.list(this.PATH).push(home).then((result: any) => {
        if (file) {
          this.uploadImg(result.key, file);
        }
      });
    }
  }

  uploadImg(key: string, file: File) {
    const storageRef = this.fb.storage().ref();              // put(file) adicionando o arquivo
    const uploadTask = storageRef.child(this.PATH_IMG + key).put(file);
                                              // quando o status mudar... implementar 3 métodos
                                              // snapshot, error e quando tiver finalizado
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        // upload em andamento
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload falhou
        console.log(error);
      },
      () => {
        // upload com sucesso, update estou usando somente uma parte do registro
                                                          //uploadTask pego a propriedade downloadURL que é caminho do storage gravado da imagem
        this.db.object(this.PATH + key).update({ imgUrl: uploadTask.snapshot.downloadURL });
      }
    );
  }
  remove(key: string, removeImg: boolean) {
    this.db.list(this.PATH).remove(key).then(() => {
      if (removeImg) {
        this.removeImg(key);
      }
    });

  }
  private removeImg(key: string) {
    const storageRef = this.fb.storage().ref();
    storageRef.child(this.PATH_IMG + key).delete();
  }
  removeImgOfProduct(key: string) {
    this.removeImg(key);
    this.db.object(this.PATH + key).update({ imgUrl: '' });
  }



}
