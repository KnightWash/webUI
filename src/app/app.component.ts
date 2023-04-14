// // Brian Langejans: TheBguy87
// // Kurt Wietelmann: kwietelmann
// // 12/10/2022
// import { Component, OnInit } from '@angular/core';
// import { environment } from "../environments/environment";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {
// title = 'af-notification';
//   message:any = null;
//   constructor() {}
//   ngOnInit(): void {
//     this.requestPermission();
//     this.listen();
//   }
//   requestPermission() {
//     const messaging = getMessaging();
//     getToken(messaging,
//      { vapidKey: environment.firebase.vapidKey}).then(
//        (currentToken) => {
//          if (currentToken) {
//            console.log("Hurraaa!!! we got the token.....");
//            console.log(currentToken);
//          } else {
//            console.log('No registration token available. Request permission to generate one.');
//          }
//      }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//     });
//   }
//   listen() {
//     console.log("listening!")
//     const messaging = getMessaging();
//     onMessage(messaging, (payload) => {
//       console.log('Message received. ', payload);
//       this.message=payload;
//     });
//   }
// }
import { Component } from '@angular/core';
import { MessagingService } from './push.notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'push-notification';

  constructor(private messagingService: MessagingService) {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }
}