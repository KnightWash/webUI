import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Machine } from '../home-page/home-page.component';
import {
  PushNotificationsService
} from '../push.notification.service';

// All notifications help from https://dzone.com/articles/browser-push-notification-in-angular-5#
@Component({
  selector: 'app-notif-toggle',
  templateUrl: './notif-toggle.component.html',
  styleUrls: ['./notif-toggle.component.scss']
})
export class NotifToggleComponent {
  private title: string = 'Browser Push Notifications!';

  constructor(private _notificationService: PushNotificationsService) {
      this._notificationService.requestPermission();
  }

  ngOnInit() {
    this.newSwitchVal = this.machine.notifsOn;
    if (this.newSwitchVal === true && this.machine.status === "Off") {
      this.notify();
      this.newSwitchVal = false;
      this.toggleNotify();
    }
  }

  @Input() machine: Machine;
  @Output() toggleNotifs: EventEmitter<Machine> = new EventEmitter();
  newSwitchVal = false;
  // Help from: https://stackoverflow.com/questions/50094246/how-to-use-matslidetogglechange-of-mat-slide-toggle-in-angular-material
  // when the user toggles the notification slider, subscribe to push notifications
  onChange($event: MatSlideToggleChange) {
    this.toggleNotify();
  }

  toggleNotify() {
    //console.log("got to deepest toggle notifs! current value is: " + this.machine.notifsOn);
    this.machine.notifsOn = this.newSwitchVal;
    //console.log("changing to" + this.machine.notifsOn);
    this.toggleNotifs.emit(this.machine);
  }

  notify() {
    let data: Array < any >= [];
    data.push({
        'title': 'Load Complete!',
        'alertContent': 'Your machine has completed its task, please grab your laundry!'
    });

    this._notificationService.generateNotification(data);
  }

}