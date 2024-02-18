import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  async handleAuth() {
    const response = await this.auth.signInWithGithub();
    console.log(response);
  }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }

}
