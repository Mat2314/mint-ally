import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-short',
  templateUrl: './article-short.component.html',
  styleUrls: ['./article-short.component.scss']
})
export class ArticleShortComponent implements OnInit {

  @Input() articleId: string = "";
  @Input() title: string = "";
  @Input() shortText: string = "";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openFullArticle() {
    this.router.navigate([`/nav/blog/${this.articleId}`]);
  }

}
