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

  // when the submit button is clicked...
  sendMessage = () => {
    const testerList = this.db.collection(`submissions`);
    const userResponse = {
      email: this.email,
      platforms: this.platforms,
      availability: this.availability,
    };
    // ...the database will be filled in with an entry containing anything the user's typed in to the input fields
    testerList.add({ ...userResponse });

    // Clear the value of the input fields when submitted
    // TypeScript is fun https://stackoverflow.com/a/12687137
    const inputs = <HTMLInputElement[]><any>document.getElementsByName('formBox');
    inputs.forEach(input => {
      // console.log(input);
      input.value = '';
    });

  }

}


