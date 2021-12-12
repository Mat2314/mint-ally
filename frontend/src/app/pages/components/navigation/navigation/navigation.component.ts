import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/services/authentication.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  faBars = faBars;

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  goToPage(path: string) {
    this.router.navigate([`/nav/${path}`]);
    this.drawer?.close();
  }

  logout() {
    this.authService.logout();
  }

}
