import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  currentMessage =
    new BehaviorSubject<firebase.messaging.MessagePayload | null>(null);

  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe((message) => {
      this.currentMessage.next(message);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((message) => {
      console.log('New message received. ', message);
      this.currentMessage.next(message);
    });
  }
}