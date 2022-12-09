import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

// import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 8080,
  path: '/calvin/beta/washer/test'
}


@NgModule({
  declarations: [
    AppComponent
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
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
