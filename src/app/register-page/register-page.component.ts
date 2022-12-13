import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

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


