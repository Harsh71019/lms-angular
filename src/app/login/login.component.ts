import { Component } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService) {}
  inSubmission = false;

  credentials = {
    email: '',
    password: '',
  };

  async login() {
    this.auth.login(this.credentials.email, this.credentials.password);
  }
  ngOnInit(): void {}
}
