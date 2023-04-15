// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Machine } from '../home-page/home-page.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessagingService } from '../push.notification.service';
import { UserNotifInfo } from '../interfaces';
//import { PushNotificationsService } from '../push.notification.service';

// All notifications help from https://dzone.com/articles/browser-push-notification-in-angular-5#
@Component({
  selector: 'app-notif-toggle',
  templateUrl: './notif-toggle.component.html',
  styleUrls: ['./notif-toggle.component.scss']
})
export class NotifToggleComponent {
  private title: string = 'Browser Push Notifications!';
  private userToken: string | undefined;

  // same inputs and outputs as the machine card
  @Input() machine: Machine;
  @Output() toggleNotifs: EventEmitter<Machine> = new EventEmitter();
  newSwitchVal = false;
  private _notificationService: MessagingService;

  constructor(private db: AngularFirestore,
              private messagingService: MessagingService) {
  }

  ngOnInit() {
    //this._notificationService.requestPermission();
    // set the new switch val to be the current one passed down from the parent homepage component
    this.newSwitchVal = this.machine.notifsOn;
    // if the new value is true and the machine is off, send the notification and update vals
    if (this.newSwitchVal === true && this.machine.status === "Off") {
      //this.notify();
      this.newSwitchVal = false;
      this.toggleNotify();
    }
  }

  // Help from: https://stackoverflow.com/questions/50094246/how-to-use-matslidetogglechange-of-mat-slide-toggle-in-angular-material
  // when the user toggles the notification slider, subscribe to push notifications
  onChange($event: MatSlideToggleChange) {
    this.toggleNotify();
  }

  // toggle notification vals and emit new machine with those values
  toggleNotify() {
    this.machine.notifsOn = this.newSwitchVal;
    if (this.newSwitchVal === true) {
      this.messagingService.requestPermission();
      const notifInfo: UserNotifInfo = {
        machine: this.machine.name,
        token: this.messagingService.userToken

      }
      this.db.collection<UserNotifInfo>('/UserNotifs').doc(this.userToken).set(notifInfo);
    }
    if (this.newSwitchVal === false) {
      this.db.collection<UserNotifInfo>('/UserNotifs').doc(this.userToken).delete();
    }
    //this.toggleNotifs.emit(this.machine);
  }

}