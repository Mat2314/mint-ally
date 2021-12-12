import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';
import { faSmileBeam, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';

export interface MoodIcon {
  name: string;
  icon: any;
  selected: boolean;
}

@Component({
  selector: 'app-mood-form',
  templateUrl: './mood-form.component.html',
  styleUrls: ['./mood-form.component.scss']
})
export class MoodFormComponent implements OnInit {
  public moodIcons: Array<MoodIcon> = [
    {
      name: 'positive',
      icon: faSmileBeam,
      selected: false,
    },
    {
      name: 'neutral',
      icon: faMeh,
      selected: false,
    },
    {
      name: 'negative',
      icon: faFrown,
      selected: false,
    },
  ];

  public note: string = "";
  public selectedIcon: MoodIcon | undefined;

  constructor(private logService: LogService,
    private httpService: HttpService,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
  }

  onIconClicked(icon: any) {
    for (let i = 0; i < this.moodIcons.length; i++) {
      this.moodIcons[i].selected = false;

      if (this.moodIcons[i].name === icon.name) {
        this.moodIcons[i].selected = true;
        this.selectedIcon = this.moodIcons[i];
      }
    }
  }

  /**
   * Send user mood and note to the server.
   */
  onSubmit() {
    if(!this.selectedIcon) {
      return;
    }

    let data = {
      "mood": this.selectedIcon?.name,
      "note": this.note
    };

    this.httpService.httpPost('health/status/', data).subscribe(
      res => {
        this.logService.log(res);
        this.snackBarService.showSnackBar(res.message);
        this.resetFormData();
      }, err => {
        this.logService.log(err);
        this.snackBarService.showSnackBar(err.error.message);
      }
    );
  }

  /**
   * Set form data as default
   */
  resetFormData() {
    this.note = "";
    for (let i = 0; i < this.moodIcons.length; i++) {
      this.moodIcons[i].selected = false;
    }
  }

}
