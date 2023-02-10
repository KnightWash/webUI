// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationsService } from './push.notification.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KnightWash-WebUI';
  readonly VAPID_PUBLIC_KEY = "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

  constructor(
    private swPush: SwPush,
    private pushNotificationsService: PushNotificationsService) {}
}
