import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { AccountProvider } from './../../providers/account/account';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  form: FormGroup;
        userName: string;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public menu: MenuController,
              private toast: ToastController,
              private AccountProvider: AccountProvider,
              public navParams: NavParams) {
              this.createForm();
  }

  private createForm(){
    this.form = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  onSubmit() {
    if (this.form.valid){
      this.AccountProvider.forgotEmail(this.form.value.email)
      .then((user:any) => {
        this.toast.create({message:'Um e-mail foi enviado para que você resete sua senha', duration: 6000 }).present();
        this.navCtrl.pop();

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

}
