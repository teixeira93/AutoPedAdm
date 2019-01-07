import { MarcasProvider } from './../../providers/marcas/marcas';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-edit-marcas',
  templateUrl: 'edit-marcas.html',
})
export class EditMarcasPage {
  title: string;
  form: FormGroup;
  marca: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private marcasProvider: MarcasProvider) {
      this.marca = this.navParams.data.marca || {};
      this.SetupPageTitle();
      this.createForm();

      const consulta = this.marcasProvider.get(this.navParams.data.marcakey).subscribe((Data: any) =>{
        consulta.unsubscribe();
        this.marca = Data;
        this.createForm();
      });
  }

  private SetupPageTitle(){
    if(this.navParams.data.marca){
      this.title = 'Alterando Produto';
    }
    else{
      this.title = 'Novo Produto';
    }
  }

  private createForm(){
    this.form = this.formBuilder.group({
      key:[this.marca.key],
      nome:[this.marca.nome, Validators.required],

    })
  }

  onSubmit(){
    if(this.form.valid){
      this.marcasProvider.save(this.form.value);
      this.toast.create({ message: 'produto salvo com sucesso!', duration: 3000 }).present();
      this.navCtrl.pop();
    }
  }

}
