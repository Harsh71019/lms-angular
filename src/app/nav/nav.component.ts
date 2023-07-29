import { Component } from '@angular/core';
import { AuthenticationService } from '../_service/authentication.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  constructor(public auth: AuthenticationService) {}
}
