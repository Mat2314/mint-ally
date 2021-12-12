import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-article-page',
  templateUrl: './blog-article-page.component.html',
  styleUrls: ['./blog-article-page.component.scss']
})
export class BlogArticlePageComponent implements OnInit {

  public articleId: string = "";

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.articleId = this.route.snapshot.params.id;
  }

}
