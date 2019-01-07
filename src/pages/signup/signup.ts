import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AccountProvider } from './../../providers/account/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SigninPage } from '../signin/signin';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  form: FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private auth: AccountProvider,
              private toast: ToastController,
              public menu: MenuController,
              public navParams: NavParams) {
              this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
     nome:['', Validators.required],
     nascimento:[''],
     email:['', [Validators.required, Validators.email]],
     password:['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid){
      this.auth.createAccount(this.form.value)
      .then(() => {
        this.toast.create({message:'Conta criada com sucesso. Foi enviado um e-mail para você confirmar, antes de efetuar o login', duration:3000}).present();
        this.navCtrl.setRoot(SigninPage);
      })
      .catch(message => {
        this.toast.create({message: message, duration:3000}).present();
      })
    }
  }

  onClose(){
    this.navCtrl.pop();
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }


  ionViewWillLeave(){
    this.menu.enable(true);
  }

}
