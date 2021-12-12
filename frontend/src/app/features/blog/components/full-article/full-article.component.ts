import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { LogService } from '@core/services/log.service';
import { SnackBarService } from '@core/services/snack-bar.service';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.scss']
})
export class FullArticleComponent implements OnInit {

  @Input() articleId: string= "";
  
  public title: string | undefined;
  public content: string | undefined;
  
  constructor(
    private logService: LogService,
    private httpService: HttpService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    let httpParams = new HttpParams().set('id', this.articleId);
    this.httpService.httpGet('blog/article/', httpParams).subscribe(
      res => {
        this.logService.log(res);
        this.title = res.title;
        this.content = res.content;
      }, err => {
        this.logService.log(err);
      }
    );
  }

}
