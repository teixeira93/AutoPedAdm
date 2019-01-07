import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AccountProvider } from './../../providers/account/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';


@IonicPage()

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  form:FormGroup;

  constructor(public navCtrl: NavController,
              private FormBuilder:FormBuilder,
              public menu: MenuController,
              public loadingCtrl: LoadingController,
              private auth: AccountProvider,
              private toast: ToastController,
              public navParams: NavParams) {
              this.createForm();

  }

  private createForm() {
    this.form = this.FormBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
    });
  }

  onSubmit(){
    if (this.form.valid){
      this.auth.login(this.form.value)
      .then((user:any) => {
        if (user.emailVerified){
          this.navCtrl.setRoot(HomePage);
        }
        else{
          this.toast.create({message:'Seu e-mail ainda não foi verificado. Por favor acesse seu e-mail e clique no link para verificar conta.', duration: 4000}).present();
        }
      })
      .catch(message => {
        this.toast.create({message: message, duration:3000}).present();
      })
    }

  }


  ionViewDidEnter(){
    this.menu.enable(false);
  }


  ionViewWillLeave(){
    this.menu.enable(true);
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: "Carregando...",
      duration: 2000
    });
    loader.present();
  }


}
