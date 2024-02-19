import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { GoogleAuthProvider, User, getAuth, signInWithPopup } from 'firebase/auth';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firestore = inject(Firestore);
  
  @Input() currentUser!: User;
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router
  ) { }

  logInWithGoogle() {
    this.login.emit();
  }

  backToMainPage() {
    this.router.navigate(['/']);
  }

}
