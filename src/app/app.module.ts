import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { SlidePage } from '../pages/slide/slide';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AccountProvider } from '../providers/account/account';
import { MarcasProvider } from '../providers/marcas/marcas';
import { ProdutosProvider } from '../providers/produtos/produtos';
import { ToastProvider } from '../providers/toast/toast';
import { PedidosProvider } from '../providers/pedidos/pedidos';
import { FinalizadoProvider } from '../providers/finalizado/finalizado';
import { HomeProvider } from '../providers/home/home';


@NgModule({
  declarations: [
    MyApp,
    SlidePage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyB0UhU3g9jNqJWBlp3YTuDsteXBBz9jAuU",
    authDomain: "autoped-fea52.firebaseapp.com",
    databaseURL: "https://autoped-fea52.firebaseio.com",
    projectId: "autoped-fea52",
    storageBucket: "autoped-fea52.appspot.com",
    messagingSenderId: "1010967951943"

    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SlidePage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    MarcasProvider,
    ProdutosProvider,
    ToastProvider,
    PedidosProvider,
    FinalizadoProvider,
    HomeProvider
  ]
})
export class AppModule {}
