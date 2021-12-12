import { Component, OnInit } from '@angular/core';
import { LogService } from '@core/services/log.service';
import { HttpService } from "@core/services/http.service";
import { SnackBarService } from '@core/services/snack-bar.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public positiveMessage: string = "";
  
  public geoLocationAllowed: boolean = false;
  public geolocation: any = {
    latitude: "",
    longitude: ""
  }

  constructor(private logService: LogService,
    private httpService: HttpService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.getPositiveMessage();
    this.getLocation();
  }

  sosMessage() {
    let data = {}

    if(this.geoLocationAllowed) {
      data = {
        "latitude": this.geolocation.latitude,
        "longitude": this.geolocation.longitude
      }
    }

    this.httpService.httpPost('contacts/sos-message/', data).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

  getPositiveMessage() {
    this.httpService.httpGet('notifications/positive/').subscribe(
      res => {
        this.logService.log(res);
        this.positiveMessage = res.positive_message.content;
      }, err => {
        this.logService.log(err);
      }
    );
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          // console.log("Latitude: " + position.coords.latitude +
          //   "Longitude: " + position.coords.longitude);
          this.geolocation.latitude = position.coords.latitude;
          this.geolocation.longitude = position.coords.longitude;
          this.geoLocationAllowed = true;
          // console.log(this.latitude);
          // console.log(this.longitude);
        }
      },
        (error: any) => {
          console.log(error);
          this.geoLocationAllowed = false;
        });
    } else {
      this.geoLocationAllowed = false;
      alert("Geolocation is not supported by this browser.");
    }
  }


}
