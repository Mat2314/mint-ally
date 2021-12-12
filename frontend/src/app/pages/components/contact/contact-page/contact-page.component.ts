import { Component, OnInit } from '@angular/core';
import { faVideo, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  faVideo=faVideo;
  faPhone=faPhone;

  public lat: string | undefined;
  public lng: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  

}
