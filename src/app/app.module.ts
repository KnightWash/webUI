import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

// import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import {MatSelectModule} from '@angular/material/select';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormField } from "@angular/material/form-field";


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { AboutPageComponent } from './about-page/about-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MachineCardComponent } from './machine-card/machine-card.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { NotifToggleComponent } from './notif-toggle/notif-toggle.component';
//import { MessagingService } from './push.notification.service';
import { ForegroundNotificationsService } from './foreground.notification.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminToggleComponent } from './admin-toggle/admin-toggle.component';
import { AdminCardComponent } from './admin-page/admin-card/admin-card.component';
import { ServiceWorkerModule, SwUpdate, SwPush, SwRegistrationOptions } from '@angular/service-worker';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { NgChartsModule } from 'ng2-charts';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 8081,
  path: "/mqtt",
  protocol: 'wss'
}


@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    MachineCardComponent,
    NotifToggleComponent,
    AdminPageComponent,
    AdminToggleComponent,
    AdminCardComponent,
    AnalyticsPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireMessagingModule,
    AngularFireAnalyticsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerImmediately'
    // }),
    ServiceWorkerModule.register('firebase-messaging-sw.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    }),
    NgChartsModule,
  ],
  providers: [
    {
      provide: SwRegistrationOptions,
      useFactory: () => ({ enabled: environment.production }),
    },
    ForegroundNotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
