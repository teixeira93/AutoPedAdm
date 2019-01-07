import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeProvider } from './../../providers/home/home';


@IonicPage()
@Component({
  selector: 'page-edit-home',
  templateUrl: 'edit-home.html',
})
export class EditHomePage {
  title: string;
  form: FormGroup;
  home:any;
  hasImg = false;
  private file: File = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastController,
              private homeProvider: HomeProvider,
              ){
              this.home = this.navParams.data.home || {};
              this.SetupPageTitle();
              this.createForm();

              const consulta = this.homeProvider
              .get(this.navParams.data.homekey).subscribe((Data:any) => {consulta.unsubscribe();
              this.home = Data;
              this.createForm();
            });
            this.hasImg = this.home.imgUrl != '';
  }


  private SetupPageTitle(){
    if (this.navParams.data.home){
      this.title = 'Alterando home';
    }else{
      this.title = 'nova home';
    }
  }

  private createForm(){
      this.form = this.formBuilder.group({
      key:[this.home.key],
      titulohome:[this.home.titulohome, Validators.required],
      descricaohome:[this.home.descricaohome, Validators.required],
      imgUrl: [this.home.imgUrl],
      img:[this.home.img],
    })
  }
  onSubmit(){
    if(this.form.valid){
      this.homeProvider.save(this.form.value, this.file);
      this.toast.create({message: 'Noticia salva com sucesso', duration:1000}).present();
      this.navCtrl.pop();
    }
  }

  fileEvent(fileInput: any) {
    this.file = null;

    if (fileInput.target.files.length) {
      this.file = fileInput.target.files[0];
      this.form.controls['img'].updateValueAndValidity();

      if (['image/png', 'image/jpeg'].indexOf(this.file.type) < 0) {
        this.form.controls['img'].setErrors({ 'imgType': true });
      }
    }
  }

  removeImg() {
    this.form.controls['imgUrl'].setValue('');
    this.hasImg = false;
    if (this.form.value.key) {
      this.homeProvider.removeImgOfProduct(this.form.value.key);
    }
  }

}
