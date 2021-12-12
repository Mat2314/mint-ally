import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { AuthenticationService } from './services/authentication.service';
import { LogService } from './services/log.service';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import { SnackBarService } from './services/snack-bar.service';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CustomSnackBarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports: [
  ],
  providers: [
    AuthenticationService,
    HttpService,
    LogService,
    SnackBarService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: 'center', verticalPosition: 'bottom' } }
  ]
})
export class CoreModule { }
