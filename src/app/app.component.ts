import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SlidePage } from '../pages/slide/slide';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;

  rootPage:any = SlidePage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              private auth: AngularFireAuth,
              public splashScreen: SplashScreen) {
                this.initializeApp();

                this.pages = [
                  { icon: 'home', title: 'Pagina Inicial', component: HomePage },
                  { icon: 'shirt', title: 'Treinos', component: 'MarcasPage' },
                  // { icon: 'create', title: 'Pedido em andamento', component: 'PedidoPage' },
                  // { icon: 'list-box', title: 'Pedidos Feitos', component: 'PedidosFeitosPage'},
                  { icon: 'attach', title: 'Sobre', component: 'SobrePage'}

                ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      let funcaoRetorno = (data) => {
         console.log('Notificações: ' + JSON.stringify(data));
      };

      window["plugins"].OneSignal.startInit("2ef4f1b8-e54f-4705-9fd8-a74522b380cc",
          "1010967951943")
          .handleNotificationOpened(funcaoRetorno)
          .endInit();
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  signOut(){
    this.auth.auth.signOut();
    this.nav.setRoot('SigninPage')
  }

}

