import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHelpContactFormComponent } from './components/add-help-contact-form/add-help-contact-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AddHelpContactDialogComponent } from './components/add-help-contact-dialog/add-help-contact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AddHelpContactFormComponent,
    AddHelpContactDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ], 
  exports: [
    AddHelpContactFormComponent,
    AddHelpContactDialogComponent
  ]
})
export class AddHelpContactFormModule { }
