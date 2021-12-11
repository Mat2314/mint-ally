import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { LogService } from './services/log.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    HttpService,
    LogService,
  ]
})
export class CoreModule { }
