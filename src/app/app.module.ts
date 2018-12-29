import { HomePage } from './../pages/home/home';
import { LoginModule } from './../pages/login/login.module';
import { UserPageModule } from './../pages/user/user.module';
import { LoginPage } from './../pages/login/login';
import { UserPage } from './../pages/user/user';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AvalicaoService } from '../domain/avaliacao.service';
import { UserService } from '../domain/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from '../model/user.dto';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //Vanilson
    HttpClientModule,
    UserPageModule,
    LoginModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    //Vanilson
    UserPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Vanilson
    AvalicaoService,
    UserService, 
    UserDTO,
    
    UserPageModule,
    LoginModule,
    
  ]
})
export class AppModule {}
