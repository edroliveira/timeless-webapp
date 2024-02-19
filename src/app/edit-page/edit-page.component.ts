import { Component } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { addDoc } from '@angular/fire/firestore';
import { Firestore, collection } from 'firebase/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    SignupComponent,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {

  currentUser!: User;

  mainFileBlob!: Blob;
  firstFileBlob!: Blob;
  secondFileBlob!: Blob;
  thirdFileBlob!: Blob;

  constructor(

  ) { }

  logInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider()).then(resp => {
      this.currentUser = resp.user;
    }).catch(err => {
      console.error(err);
    });
  }

  async addDataToFiretore() {
    // const docRef = await addDoc(collection(this.firestore, 'main-page-data'), {
    //   // TODO: Add object data
    // });
    // console.log("Document written with ID: ", docRef.id);
  }

  onFileSelected(event: any, filePos: string): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob = new Blob([reader.result as BlobPart], { type: file.type });

      switch (filePos) {
        case 'main':
          this.mainFileBlob = blob;
          break;
        case 'first':
          this.firstFileBlob = blob;
          break;
        case 'second':
          this.secondFileBlob = blob;
          break;
        case 'third':
          this.thirdFileBlob = blob;
          break;
        default:
          break;
      }
    };
  }

}
