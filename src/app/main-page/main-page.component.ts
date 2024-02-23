import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { HeartOverlayComponent } from '../heart-overlay/heart-overlay.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { MatDividerModule } from '@angular/material/divider';
import { FirestoreService } from '../services/firestore.service';
import { PageText } from '../model/page-text';
import { PageImage } from '../model/page-image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
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
  
  showContent: boolean = false;
  videoId!: string;
  playerVars = { autoplay: 1 }

  images!: PageImage;
  pageText!: PageText;

  isLoading: boolean = false;

  playVideo() {
    var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
    iframe!.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
    this.showContent = true;
  }

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    this.firestoreService.getPageText().subscribe(pageText => {
      this.pageText = pageText;
    });

    this.firestoreService.getMusicUrl().subscribe(musicVideoId => {
      this.videoId = musicVideoId;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.firestoreService.fetchParagraphs();
    this.firestoreService.fetchMusicVideoId();
    this.getImagesFromStorage();
  }

  openEditPage() {
    this.router.navigate(['/edit']);
  }

  getImagesFromStorage() {
    this.images = this.firestoreService.getImages();
  }

  wait() {

  }

}
