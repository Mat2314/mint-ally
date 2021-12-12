import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { SnackBarService } from '@core/services/snack-bar.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    // this.ifLoggedInRedirectToDashboard();
  }

  ifLoggedInRedirectToDashboard() {
    this.authService.userIsAuthenticated().subscribe();
    this.snackBarService.showSnackBar("It's great to see you again!");
  }

}
