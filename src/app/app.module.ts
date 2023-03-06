import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";


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
import { PushNotificationsService } from './push.notification.service';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminToggleComponent } from './admin-toggle/admin-toggle.component';
import { AdminCardComponent } from './admin-page/admin-card/admin-card.component';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
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
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    }),
    NgChartsModule,
  ],
  providers: [PushNotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
