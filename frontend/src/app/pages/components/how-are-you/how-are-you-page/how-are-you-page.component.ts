import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-are-you-page',
  templateUrl: './how-are-you-page.component.html',
  styleUrls: ['./how-are-you-page.component.scss']
})
export class HowAreYouPageComponent implements OnInit {

  public cardTitle: string = "Tell us how you feel";
  public cardContent: string = "Here you can select your current mood and describe your feelings more deeply";

  constructor() { }

  ngOnInit(): void {
  }

}
