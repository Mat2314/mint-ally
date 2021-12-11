import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @ViewChild('menuCard') menuCard: HTMLElement | undefined;
  @Input() backgroundImage: string = "";

  constructor() {}

  ngOnInit(): void {
  }

}
