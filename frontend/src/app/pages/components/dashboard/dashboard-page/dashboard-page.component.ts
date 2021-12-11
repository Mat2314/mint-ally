import { Component, OnInit } from '@angular/core';
import { LogService } from '@core/services/log.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  sosMessage() {
    this.logService.log("SOS message");
  }

}
