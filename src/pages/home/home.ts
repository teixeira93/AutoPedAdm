import { Observable } from 'rxjs/observable';
import { HomeProvider } from './../../providers/home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
 import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName: string;
  marcas: Observable<any[]>;
  homes:Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private toast: ToastController,
              private homeProvider: HomeProvider,
              ) {

                  this.homes = this.homeProvider.getAll();
  }

  ionViewDidLoad() {
    const userState = this.auth.authState.subscribe( user => {
      if (user){
        this.userName = user.displayName;
        userState.unsubscribe();
      }

    })
  }

  newItemHome(){
    this.navCtrl.push('EditHomePage')
  }

  deletarHome(key:string, removeImg: boolean){
    this.homeProvider.remove(key, removeImg);
    this.toast.create({message: 'Noticia removida com sucesso!', duration:3000}).present();
  }



}
