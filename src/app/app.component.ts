// // Brian Langejans: TheBguy87
// // Kurt Wietelmann: kwietelmann
// // 12/10/2022

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
