// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Machine } from '../home-page/home-page.component';
//import { PushNotificationsService } from '../push.notification.service';

// All notifications help from https://dzone.com/articles/browser-push-notification-in-angular-5#
@Component({
  selector: 'app-notif-toggle',
  templateUrl: './notif-toggle.component.html',
  styleUrls: ['./notif-toggle.component.scss']
})
export class NotifToggleComponent {
  private title: string = 'Browser Push Notifications!';

  // same inputs and outputs as the machine card
  @Input() machine: Machine;
  @Output() toggleNotifs: EventEmitter<Machine> = new EventEmitter();
  newSwitchVal = false;

  constructor() {
      //this._notificationService.requestPermission();
  }

  ngOnInit() {
    // set the new switch val to be the current one passed down from the parent homepage component
    this.newSwitchVal = this.machine.notifsOn;
    // if the new value is true and the machine is off, send the notification and update vals
    if (this.newSwitchVal === true && this.machine.status === "Off") {
      //this.notify();
      this.newSwitchVal = false;
      //this.toggleNotify();
    }
  }

  // Help from: https://stackoverflow.com/questions/50094246/how-to-use-matslidetogglechange-of-mat-slide-toggle-in-angular-material
  // when the user toggles the notification slider, subscribe to push notifications
  onChange($event: MatSlideToggleChange) {
    //this.toggleNotify();
  }

  // toggle notification vals and emit new machine with those values
  toggleNotify() {
    this.machine.notifsOn = this.newSwitchVal;
    //this.toggleNotifs.emit(this.machine);
  }

  // send push notification - this does not work with the mobile version of chrome, but should in most other places
  // Help from https://dzone.com/articles/browser-push-notification-in-angular-5#
  notify() {
    //let data: Array < any >= [];
    // data.push({
    //     'title': 'Load Complete!',
    //     'alertContent': 'Your machine has completed its task, please grab your laundry!'
    // });

    //this._notificationService.generateNotification(data);
  }

}