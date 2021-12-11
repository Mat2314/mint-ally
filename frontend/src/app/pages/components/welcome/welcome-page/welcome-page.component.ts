import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    // this.ifLoggedInRedirectToDashboard();
  }

  ifLoggedInRedirectToDashboard() {
    this.authService.userIsAuthenticated().subscribe();
  }

}
