import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-slide',
  templateUrl: 'slide.html',
})
export class SlidePage {
  splash = true;

  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidePage');
    setTimeout(() => this.splash = false, 4000);
  }

  openLogin(){
    this.navCtrl.push('SigninPage');

  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }


  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
