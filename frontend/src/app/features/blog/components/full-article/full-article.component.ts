import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.scss']
})
export class FullArticleComponent implements OnInit {

  @Input() articleId: string= "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
