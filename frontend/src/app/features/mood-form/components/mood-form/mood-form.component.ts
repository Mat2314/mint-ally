import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogService } from '@core/services/log.service';
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
      name: 'smile',
      icon: faSmileBeam,
      selected: false,
    },
    {
      name: 'neutral',
      icon: faMeh,
      selected: false,
    },
    {
      name: 'sad',
      icon: faFrown,
      selected: false,
    },
  ];

  public moodForm: FormGroup = new FormGroup({
    mood: new FormControl(null, Validators.required),
    note: new FormControl(null, [])
  });

  constructor(private logService: LogService) { }

  ngOnInit(): void {
  }

  onIconClicked(icon:any) {
    for(let i=0; i<this.moodIcons.length; i++) {
      this.moodIcons[i].selected = false;

      if(this.moodIcons[i].name === icon.name) {
        this.moodIcons[i].selected = true;
      }
    }
  }

}
