import { Component, inject } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { Firestore } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { getAuth } from '@angular/fire/auth';
import { PageText } from '../model/page-text';
import { FirestoreService } from '../services/firestore.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    SignupComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatFormField,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {

  firestore = inject(Firestore);
  storage = inject(Storage);
  filePath: string = '/images/';
  currentUser!: User;

  topFileBlob!: Blob;
  firstFileBlob!: Blob;
  secondFileBlob!: Blob;
  thirdFileBlob!: Blob;

  isLoading: boolean = false;

  topPr = new FormControl('');
  firstRowPr = new FormControl('');
  secondRowPr = new FormControl('');
  thirdRowPr = new FormControl('');

  constructor(
    private firestoreService: FirestoreService
  ) { }

  logInWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, new GoogleAuthProvider()).then(resp => {
      this.currentUser = resp.user;
    }).catch(err => {
      console.error(err);
    });
  }

  onFileSelected(event: any, filePos: string): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const blob = new Blob([reader.result as BlobPart], { type: file.type });

      switch (filePos) {
        case 'top':
          this.topFileBlob = blob;
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

  async addDataToStorage(imgBlob: Blob, imgPath: string) {
    const storageRef = ref(this.storage, this.filePath + imgPath);
    const uploadTask = await uploadBytes(storageRef, imgBlob);
    const dowloadUrl = getDownloadURL(uploadTask.ref);
    console.log(dowloadUrl);
  }

  async saveChanges() {
    this.isLoading = true;
    await this.uploadImages();
    await this.uploadText();
    alert('Alterações salvas com sucesso!');
    this.isLoading = false;

  }

  async uploadImages() {
    try {
      if (this.topFileBlob) {
        await this.addDataToStorage(this.topFileBlob, 'top');
      }
      if (this.firstFileBlob) {
        await this.addDataToStorage(this.firstFileBlob, 'first');
      }
      if (this.secondFileBlob) {
        await this.addDataToStorage(this.secondFileBlob, 'second');
      }
      if (this.thirdFileBlob) {
        await this.addDataToStorage(this.thirdFileBlob, 'third');
      }

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao fazer upload das imagens. Tente novamente mais tarde');
    }
  }

  async uploadText() {
    const pageText = new PageText(
      this.topPr.value!,
      this.firstRowPr.value!,
      this.secondRowPr.value!,
      this.thirdRowPr.value!
    );

    try {
      await this.firestoreService.updateTexts(pageText);
    } catch (error) {
      alert('Ocorreu um erro ao fazer upload das imagens. Tente novamente mais tarde');
    }
  }

}
