import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon';
import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { getAuth } from '@angular/fire/auth';
import { PageText } from '../model/page-text';
import { FirestoreService } from '../services/firestore.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

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
    MatSelectModule,
    MatIconModule,
    ColorPickerModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnInit {

  isLoading: boolean = false;
  currentUser!: User;

  topFileBlob!: Blob;
  firstFileBlob!: Blob;
  secondFileBlob!: Blob;
  thirdFileBlob!: Blob;

  musicVideoId = new FormControl('');

  topPr = new FormControl('');
  firstRowPr = new FormControl('');
  secondRowPr = new FormControl('');
  thirdRowPr = new FormControl('');
  textColor!: string;

  backgroundColor!: string;

  constructor(
    private firestoreService: FirestoreService
  ) {
    this.firestoreService.getPageText().subscribe(pageText => {
      this.topPr.setValue(pageText.topPr);
      this.firstRowPr.setValue(pageText.firstRowPr);
      this.secondRowPr.setValue(pageText.secondRowPr);
      this.thirdRowPr.setValue(pageText.thirdRowPr);
      this.textColor = pageText.textColor;
    });

    this.firestoreService.getMusicUrl().subscribe(musicVideoId => {
      this.musicVideoId.setValue(musicVideoId);
    });

    this.firestoreService.getBackgroundColor().subscribe(color => {
      this.backgroundColor = color;
    });
  }

  ngOnInit(): void {
    this.firestoreService.fetchParagraphs();
    this.firestoreService.fetchMusicVideoId();
    this.firestoreService.fetchBackground();
  }

  logInWithGoogle() {
    signInWithPopup(getAuth(), new GoogleAuthProvider()).then(resp => {
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

  onTextColorSelected(textColor: string) {
    this.textColor = textColor;
  }

  async saveChanges() {
    this.isLoading = true;
    await this.uploadImages();
    await this.uploadText();
    await this.uploadMusicVideoId();
    await this.uploadBackgroundColor();
    alert('Alterações salvas com sucesso!');
    this.isLoading = false;
  }

  async uploadImages() {
    try {
      if (this.topFileBlob) {
        await this.firestoreService.addDataToStorage(this.topFileBlob, 'top');
      }
      if (this.firstFileBlob) {
        await this.firestoreService.addDataToStorage(this.firstFileBlob, 'first');
      }
      if (this.secondFileBlob) {
        await this.firestoreService.addDataToStorage(this.secondFileBlob, 'second');
      }
      if (this.thirdFileBlob) {
        await this.firestoreService.addDataToStorage(this.thirdFileBlob, 'third');
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
      this.thirdRowPr.value!,
      this.textColor
    );

    try {
      await this.firestoreService.updateTexts(pageText);
    } catch (error) {
      alert('Ocorreu um erro ao fazer upload dos textos. Tente novamente mais tarde');
    }
  }

  async uploadMusicVideoId() {
    if (this.musicVideoId.value) {
      await this.firestoreService.updateMusicVideoId(this.musicVideoId.value);
    }
  }

  async uploadBackgroundColor() {
    if (this.backgroundColor) {
      await this.firestoreService.updateBackgroundColor(this.backgroundColor);
    }
  }

}
