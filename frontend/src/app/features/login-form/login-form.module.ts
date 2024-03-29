import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ResetPasswordDialogComponent } from './dialogs/reset-password-dialog/reset-password-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    ResetPasswordDialogComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    LoginFormComponent,
    ResetPasswordDialogComponent,
    RegistrationFormComponent
  ]
})
export class LoginFormModule { }
