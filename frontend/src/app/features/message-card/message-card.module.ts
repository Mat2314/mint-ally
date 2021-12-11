import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageCardComponent } from './components/message-card/message-card.component';



@NgModule({
  declarations: [
    MessageCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MessageCardComponent
  ]
})
export class MessageCardModule { }
