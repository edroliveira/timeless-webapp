import { Component, OnInit, inject } from '@angular/core';
import { FirebaseApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  firestore = inject(Firestore);

  constructor(
    
  ) { }

  ngOnInit(): void {
    getDocs(collection(this.firestore, "testPath")).then((response) => {
      console.log(response.docs)
    });
  }

}
