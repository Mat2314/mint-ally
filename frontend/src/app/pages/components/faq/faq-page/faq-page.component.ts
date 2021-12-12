import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';

export interface Article {
  id: string;
  title: string;
  content: string;
  published_date: string;
  shortened_text: string;
  status: string;
}

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {

  public articles: Array<Article> = [];

  public pagination = {
    page: 1,
    pageSize: 20,
    lastPage: 1
  }

  constructor(private httpService: HttpService,
    private logService: LogService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    let httpParams = new HttpParams()
      .set('page', this.pagination.page.toString())
      .set('page_size', this.pagination.pageSize.toString());

    this.httpService.httpGet('blog/articles/', httpParams).subscribe(
      res => {
        this.logService.log(res);
        this.articles = res.data;
        this.pagination.lastPage = res.last_page;

      }, err => {
        this.logService.log(err.error.message);
      }
    );
  }

}
