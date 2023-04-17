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
import { Component, EventEmitter, Output } from '@angular/core';
import { MessagingService } from './push.notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
  <mat-sidenav-container #sidenav (click)="sidenav.close()" (backdropClick)="sidenav.close()" (keydown.escape)="sidenav.close()">
    <mat-sidenav #sidenav (click)="sidenav.close()" (backdropClick)="sidenav.close()" (keydown.escape)="sidenav.close()">
      <a mat-button [routerLink]="'/home-page'" routerLinkActive="active"> Home </a>
      <a mat-button [routerLink]="'/about-page'" routerLinkActive="active"> About </a>
      <!-- <a mat-button [routerLink]="'/admin-page'" routerLinkActive="active"> Admin </a> -->
      <a mat-button [routerLink]="'/register-page'" routerLinkActive="active"> Send Feedback </a>
      <a mat-button [routerLink]="'/analytics-page'" routerLinkActive="active"> Analytics </a>>
    </mat-sidenav>
    <mat-sidenav-content #sidenav (click)="sidenav.close()" (backdropClick)="sidenav.close()" (keydown.escape)="sidenav.close()">
      <app-header (toggleSidenav)="sidenav.toggle()"></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </mat-sidenav-content>
  </mat-sidenav-container>
`,
})
export class AppComponent {
  title = 'push-notification';
  @Output() toggleSidenav = new EventEmitter<void>();
  isSidenavOpen = false;

  constructor(private messagingService: MessagingService) {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}