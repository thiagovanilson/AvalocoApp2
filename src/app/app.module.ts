import { SeemPageModule } from './../pages/seem/seem.module';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { EvaluationMenuPageModule } from './../pages/evaluation-menu/evaluation-menu.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { HomePage               } from './../pages/home/home';
import { LoginModule            } from './../pages/login/login.module';
import { UserPageModule         } from './../pages/user/user.module';
import { LoginPage              } from './../pages/login/login';
import { UserPage               } from './../pages/user/user';
import { BrowserModule          } from '@angular/platform-browser';
import { MyApp                  } from './app.component';
import { EvaluationMenuPage     } from '../pages/evaluation-menu/evaluation-menu';
import { EvaluationPageModule   } from '../pages/evaluation/evaluation.module';
import { IndicatorPageModule    } from '../pages/indicator/indicator.module';

import { AboutPage   } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage    } from '../pages/tabs/tabs';

import { StatusBar        } from '@ionic-native/status-bar';
import { SplashScreen     } from '@ionic-native/splash-screen';
import { AvalicaoService  } from '../domain/avaliacao.service';
import { UserService      } from '../domain/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO          } from '../model/user.dto';
import { EvaluationPage   } from '../pages/evaluation/evaluation';
import { Camera           } from '@ionic-native/camera'
import { IndicatorPage    } from '../pages/indicator/indicator';
import { ClosedEvaluationsPage } from '../pages/closed-evaluations/closed-evaluations';
import { ClosedEvaluationsPageModule } from '../pages/closed-evaluations/closed-evaluations.module';

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
    EvaluationPageModule,
    EvaluationMenuPageModule,
    IndicatorPageModule,
    SeemPageModule,
    ClosedEvaluationsPageModule,    
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
    EvaluationPage,
    IndicatorPage,
    EvaluationMenuPage,
    ClosedEvaluationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Vanilson
    AvalicaoService,
    UserService, 
    UserDTO,
    HomePage,
    Camera    
  ]
})
export class AppModule {}
