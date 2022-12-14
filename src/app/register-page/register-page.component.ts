// Brian Langejans: TheBguy87
// Kurt Wietelmann: kwietelmann
// 12/10/2022
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  title = 'userData';
  email: string;
  platforms: string;
  availability: string;

  constructor(private db: AngularFirestore) {
  }

  sendMessage = () => {
    const testerList = this.db.collection(`submissions`);
    const userResponse = {
      email: this.email,
      platforms: this.platforms,
      availability: this.availability,
    };
    testerList.add({ ...userResponse });

  }

}


