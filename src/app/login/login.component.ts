import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };

  async login() {
    console.log('Done');
    console.log(this.credentials);
  }
  ngOnInit(): void {}
}
