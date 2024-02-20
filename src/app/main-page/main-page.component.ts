import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { HeartOverlayComponent } from '../heart-overlay/heart-overlay.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { MatDividerModule } from '@angular/material/divider';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { FirestoreService } from '../services/firestore.service';
import { PageText } from '../model/page-text';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeartOverlayComponent,
    YouTubePlayer,
    MatDividerModule
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  animations: [
    fadeInOnEnterAnimation()
  ]
})
export class MainPageComponent implements OnInit {

  storage = inject(Storage);
  filePath: string = '/images/';
  showContent: boolean = false;
  videoId: string = 'osmzwWw4RYM';
  playerVars = { autoplay: 0 }

  topImgSrc!: string;
  firstRowImgSrc!: string;
  secondRowImgSrc!: string;
  thirdRowImgSrc!: string;

  pageText!: PageText;

  topPr!: string;
  firstRowPr!: string;
  secondRowPr!: string;
  thirdRowPr!: string;

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    this.showContent = true;
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.pageText = this.firestoreService.getPageText();
  }

  ngOnInit(): void {
    this.getImagesFromStorage();
  }

  openEditPage() {
    this.router.navigate(['/edit']);
  }

  getImagesFromStorage() {
    const storageRefTop = ref(this.storage, this.filePath + 'top');
    getDownloadURL(storageRefTop).then(resp => this.topImgSrc = resp);

    const storageRefFirst = ref(this.storage, this.filePath + 'first');
    getDownloadURL(storageRefFirst).then(resp => this.firstRowImgSrc = resp);

    const storageRefSecond = ref(this.storage, this.filePath + 'second');
    getDownloadURL(storageRefSecond).then(resp => this.secondRowImgSrc = resp);

    const storageRefThird = ref(this.storage, this.filePath + 'third');
    getDownloadURL(storageRefThird).then(resp => this.thirdRowImgSrc = resp);
  }

}
