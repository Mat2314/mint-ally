import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleShortComponent } from './components/article-short/article-short.component';
import { FullArticleComponent } from './components/full-article/full-article.component';



@NgModule({
  declarations: [
    ArticleShortComponent,
    FullArticleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ArticleShortComponent,
    FullArticleComponent
  ]
})
export class BlogModule { }
