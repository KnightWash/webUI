import { Component, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {
  PushNotificationsService
} from '../push.notification.service';

@Component({
  selector: 'app-notif-toggle',
  templateUrl: './notif-toggle.component.html',
  styleUrls: ['./notif-toggle.component.scss']
})
export class NotifToggleComponent {
  private title: string = 'Browser Push Notifications!';
  public notifsOn: boolean;

  constructor(private _notificationService: PushNotificationsService) {
      this._notificationService.requestPermission();
  }

  ngOnInit() {}

  @Output() toggleNotifs: EventEmitter<boolean> =   new EventEmitter();
  // Help from: https://stackoverflow.com/questions/50094246/how-to-use-matslidetogglechange-of-mat-slide-toggle-in-angular-material
  // when the user toggles the notification slider, subscribe to push notifications
  onChange($event: MatSlideToggleChange) {
    this.notifsOn = !this.notifsOn;
    //this.toggleNotifs.emit(this.notifsOn);
  }

  notify() {
    console.log("got to notify!")
    let data: Array < any >= [];
    data.push({
        'title': 'Load Complete!',
        'alertContent': 'Your machine has completed its task, please grab your laundry!'
    });

    this._notificationService.generateNotification(data);
  }

}